<template>
    <div class="nav">
        <div class="container">
            <!-- 侧滑菜单 -->
            <el-drawer
                    v-if="isMobile"
                    title=""
                    :visible.sync="drawerVisible"
                    direction="ltr"
                    size="240px"
                    :modal="false"
                    custom-class="custom-drawer"
            >
                <div class="nav-items">
                    <div
                            v-for="(item, i) in navList"
                            :key="i"
                            @click="toDetail(item, i)"
                            :class="['nav-item', { 'active': $route.path === item.path }]"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </el-drawer>

            <!-- 主内容区域 -->
            <div
                    class="main-content"
                    :style="{ transform: drawerVisible ? 'translateX(240px)' : 'translateX(0)' }"
            >
                <i class="el-icon-menu" @click="toggleDrawer" v-if="isMobile" style="font-size: 22px;"></i>
                <img v-if="logoImage" :src="logoImage" alt="logo" height="75px" width="auto">
                <div class="logo" v-if="!isMobile">
                    <div class="nav-items">
                        <div
                                v-for="(item, i) in navList"
                                :key="i"
                                @click="toDetail(item, i)"
                                :class="['nav-item', { 'active': $route.path === item.path }]"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="login">
                    <div v-if="!isLogin" class="btn">
                        <div @click="login">登录</div>
                        <!-- <div @click="login('add')">注册</div> -->
                    </div>
                    <div v-else class="loginOut">
                        <el-dropdown trigger="hover">
                            <div class="avatar-wrapper">
                                <el-avatar src="https://www.aliboxx.com/uploadfile/avatar/8.png"></el-avatar>
                                <span style="font-size: 12px;margin-left:10px">{{ name }}</span>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="info">
                                    <span>后台管理</span>
                                </el-dropdown-item>
                                <el-dropdown-item divided @click.native="logout">
                                    <span>退出登录</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {getToken, register} from '@/api/user'
import {sendMobileVerifyCode, compareVerifycode, resetpass} from "@/api/user";

export default {
    name: 'Nav',
    data() {
        return {
            drawerVisible: false,
            isMobile: false,
            navList: [
                {
                    name: '首页',
                    path: '/home',
                },
                {
                    name: '产品与服务',
                    path: '/ProductService',
                },
                // {
                //     name: '招商',
                //     path: '/Business',
                // },
                {
                    name: '关于我们',
                    path: '/about',
                },
            ],
            register: {},
            isLogin: null,
            mobile: '18888888888',
            logoImage: null // 新增 logoImage 数据属性
        };
    },
    computed: {
        ...mapGetters(["avatar", "name", "roles", "isPay"]),
    },
    mounted() {
        this.isLogin = localStorage.getItem("token") ? true : false;
        const cachedFooterData = localStorage.getItem('footerData');
        if (cachedFooterData) {
            const footerData = JSON.parse(cachedFooterData);
            this.$nextTick(() => {
                this.logoImage = footerData.beianImage; // 从缓存中读取 beianImage
            });
        }
        // 初始化时检查屏幕宽度
        this.checkScreenWidth();
        // 监听窗口resize事件
        window.addEventListener('resize', this.checkScreenWidth);
    },

    methods: {
        checkScreenWidth() {
            this.isMobile = window.innerWidth < 768;
        },
        toggleDrawer() {
            this.drawerVisible = !this.drawerVisible;
            document.getElementsByTagName()
        },
        logout() {
            this.$message.success('退出成功')
            localStorage.removeItem('token')
            this.isLogin = false
            this.$router.replace({
                path: '/login'
            })
        },
        login(e) {
            if (e == 'add') {
                this.$router.push('/register')
            } else {
                this.$router.push('/login')
            }
        },
        info() {
            this.$router.push({
                path: '/info'
            })
        },
        toDetail(item, i) {
            this.$router.push({
                path: item.path
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.checkScreenWidth);
        },
    },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  height: 75px;
  z-index: 100;
  background: #ffffff;
  width: 100vw;
  margin: 0 auto;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .container {
    width: 100%;
    display: flex;
    justify-content: space-between; // 使用 space-between 来分配空间
    align-items: center; // 垂直居中对齐

    .main-content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      font-size: 20px;

      .nav-items {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */

        &::-webkit-scrollbar {
          display: none; /* WebKit */
        }
      }
    }

    .nav-item {
      flex: 0 0 auto;
      padding: 0 15px;
      height: 72px;
      line-height: 72px;
      text-align: center;
      cursor: pointer;
      white-space: nowrap;
      transition: color 0.3s;

      &:hover, &.active {
        color: #4c88ff;
      }
    }

    .login {
      display: flex;
      align-items: center;


      .loginOut {
        line-height: 72px;

        .user-avatar {
          cursor: pointer;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          margin: -5px 0 0 5px;
        }

        .avatar-wrapper {
          display: flex;
          align-items: center;
          height: 72px;
        }
      }

      .btn {
        display: flex;

        div {
          width: 50px;
          height: 72px;
          line-height: 72px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>