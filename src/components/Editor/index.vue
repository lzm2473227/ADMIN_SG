<template>
  <div class="editor">
    <div id="e" >
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { message } from 'element-ui'
  import E from "wangeditor"
  export default {
    name: 'editor',
    data(){
      return{
        content:"",
        editor: null,
        info_:null
      }
    },
    model: {
      prop: 'desc',
      event:'change'
    },
    watch:{
      isClear(val){
       // console.log(val)
        if (val){
          this.editor.txt.clear()
         // this.info_=null
        }
      },
      desc(value) {
        //console.log("desc",value)
        if (value != this.editor.txt.html()) {
          this.editor.txt.html(this.desc)
        }
      }
    },
    props:{
      desc:{
        type:String,
        default:""
      },
 //业务中我们经常会有添加操作和编辑操作，添加操作时，我们需清除上一操作留下的缓存
      isClear:{
        type:Boolean,
        default:false
      }
    },

    methods:{
      initE(){
        this.editor = new E('#e')
        this.editor.config.onchangeTimeout = 5000 // 单位 ms
        this.editor.config.uploadFileName = 'file'
        this.editor.config.uploadImgServer = `http://14.29.162.130:6602/image/imageUpload`  // 你的服务器地址
        this.editor.config.uploadImgHooks = {
          before: function (xhr, editor, files) {
            // 图片上传之前触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

            // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
            // return {
            //     prevent: true,
            //     msg: '放弃上传'
            // }
            console.log(files)
            const isLt2M = files[0].size / 1024 / 1024 < 2
            if (files[0].type != 'image/jpeg' && files[0].type != 'image/png') {
              message.error('上传只能是 JPG 格式或 png 格式!')
              return false
            }
            if (!isLt2M) {
              alert('上传图片大小不能超过 2MB!')
              // message.error('上传图片大小不能超过 2MB!')
              return false
            }
          },
          success: function (xhr, editor, result) {
            // 图片上传并返回结果，图片插入成功之后触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          },
          fail: function (xhr, editor, result) {
            // 图片上传并返回结果，但图片插入错误时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          },
          error: function (xhr, editor) {
            // 图片上传出错时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          },
          timeout: function (xhr, editor) {
            // 图片上传超时时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          },

          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
          customInsert: function (insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            // console.log(result)
            var url = result.data
            insertImg(url)

            // 多张图片上传
            // for(var j=0;j<result.data.length;j++){
            //     insertImg(result.data[j]);
            // }

            // result 必须是一个 JSON 格式字符串！！！否则报错
          }
        }
        this.editor.config.onchange = (html) => {
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
        }
        this.editor.config.zIndex = 100
        this.editor.config.height = 600
        this.editor.config.placeholder = '请输入商品详情'
        this.editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3'] // 配置行高
        this.editor.config.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'indent',
          'lineHeight',
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'todo',
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'code',  // 插入代码
          'splitLine',
          'undo',  // 撤销
          'redo'  // 重复
        ]
        this.editor.config.placeholder = '请输入商品详情'
        this.editor.config.customAlert = function (s, t) {
          switch (t) {
            case 'success':
              message.success(s)
              break
            case 'info':
              message.info(s)
              break
            case 'warning':
              message.warning(s)
              break
            case 'error':
              message.error(s)
              break
            default:
              message.info(s)
              break
          }
        }
        this.editor.create()
       // this.editor.txt.html(this.desc)
      //  this.editor.txt.html(this.desc)
        }
    },
    mounted () {
      this.initE();
    }
  }
</script>

<style scoped>

</style>
