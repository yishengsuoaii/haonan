<template>
  <div class="parent">
    <el-card class="login">
      <div class="logo">
        <img src="./../../assets/images/logo_index.png" alt />
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginRule">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号:" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码:" style="width:250px;" v-model="loginForm.code"></el-input>
          <el-button type="success" style="float:right" @click.once="yzm">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">
            我已阅读并同意
            <span style="color:#409EFF">用户协议</span>和
            <span style="color:#409EFF">隐私条款</span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="fn">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === false) {
        callback(new Error('请输入勾选协议'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810',
        // check: [] // 1
        check: true // 2
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            len: 11,
            message: '手机长度必须为11个字符',
            trigger: 'blur'
          },
          {
            pattern: /^1[13456789]\d{9}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            pattern: /^\d{6}$/,
            message: '验证码长度必须为6个数字',
            trigger: 'blur'
          }
        ],
        // check: [{ type: 'array', required: true, message: '请输入勾选协议', trigger: 'change' }]// 1

        check: [
          {
            validator: validatePass, trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    yzm () {
      this.$message({
        message: '验证码已发送,请注意查收',
        type: 'success'
      })
    },

    fn () {
      this.$refs.loginRule.validate(isOk => {
        if (isOk) {
          this.$http({
            url: '/authorizations',
            method: 'POST',
            data: {
              mobile: this.loginForm.mobile,
              code: this.loginForm.code
            }
          }).then(res => {
            if (res.status === 201) {
              localStorage.setItem('token', res.data.data.token)
              this.$router.push('/home')
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '手机号或验证码错误,请重新输入',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.parent {
  width: 100%;
  height: 100vh;
  background-image: url("./../../assets/images/login_bg.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    width: 440px;
    height: 340px;
    background-color: #fff;
    .logo {
      text-align: center;
      margin-bottom: 20px;
      img {
        height: 45px;
      }
    }
  }
}
</style>
