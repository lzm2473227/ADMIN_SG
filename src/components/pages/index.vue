<template>
    <div>
        <ul class="pagination">
            <li class="page-item" :class="{'disabled': current == 1}" @click='jump(current-1)'><img src="../../assets/images/prev.png" alt="">  </li>
            <li class="page-item" :disabled="isDisabled" @click='jump(current+1)'><img src="../../assets/images/next.png" alt=""></li>
            <li class="page-item" :class="{'disabled': current == 1}" @click='jump(1)'><img src="../../assets/images/first-page.png" alt=""></li>
            <li class="page-item" :class="{'disabled': current === page}" @click='jump(page)'><img src="../../assets/images/last-page.png" alt=""></li>
            <li class="current-page"><span> 第 {{ current }} 页 /&nbsp;</span></li>
            <li><span> 共 {{ page }} 页 </span></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                jumpPage:1,
                isDisabled: false
            }
        },
        props:{
            total:Number, // 数据总条数
            current:Number, // 当前页码
            pageSize:Number, // 每页数据条数
            sizes:{
                type:Array,
                default:function(){
                    return [15,25,35]
                }
            }
        },
        computed: {
            page: function () { // 总页数
                return Math.ceil(this.total / this.pageSize);
            },
        },
        mounted(){
            if(this.total-this.current>1){
                this.jumpPage=this.current+1;
            }
            else{
                this.jumpPage=1;
            }
        },
        watch:{
            current(){
                if(this.total-this.current>1){
                    this.jumpPage=this.current+1;
                }
                else{
                    this.jumpPage=1;
                }
            }
        },
        methods:{
            jump(index){
                if(index>this.page){
                    return this.isDisabled = true
                }else{
                    index=Number(index);
                    if (this.current != index && index > 0 && index < this.total + 1) {
                        this.$emit('changeCurrentPage', index);
                    }
                }
            },
            getPageSize(e){
                let pageSize=Number(e.target.value);
                this.$emit('getPageSize',pageSize);
            }
        }
    }
</script>

<style lang="scss" scope>
    .pagination{
        list-style: none;
        display: flex;
        align-items: center;
        padding-left: 0;
        margin: 0;
        font-size: 14px;
        li{
            display: flex;
        }
        .page-item{
            margin-left: 15px;
            cursor: pointer;
        }
        .current-page{
            margin-left: 24px;
            padding-left: 24px;
            border-left: 1px solid #D8E8F6;
        }
        span{
            color: #333;
        }
    }
</style>