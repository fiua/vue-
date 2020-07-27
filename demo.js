// var list=[
//     {
//        name:"睡觉",
//        jay:true ,
//     },
//     {
//         name:"打豆豆",
//         jay:true,
//     }
// ]
var list=JSON.parse(localStorage.getItem("todo"))||[];
var listcheck={
    all(list){
        return list;
    },
    finsh(list){
        return list.filter(function(item){
            return item.jay
        })
    },
    unfinsh(list){
        return list.filter(function(item){
            return !item.jay
        })
    }
}
var vm=new Vue({
    el:".main",
    watch:{
        list:{
            deep:true,
            handler(){
                localStorage.setItem("todo",JSON.stringify(this.list));
            }
        }
    },
    data:{
        list:list,
        inputValue:"",
        edittingtodo:"",
        beforeedit:"",
        visbilit:"all"
    },
    computed:{
        filterList(){
            return this.list.filter(function(item){return !item.jay}).length;
            console.log(1111111)//这个并不会输出
        },
        listchecked(){
            return listcheck[this.visbilit] ? listcheck[this.visbilit](this.list) : this.list;
        }
    },
    methods:{
        submits(){
            this.list.push(//list是引用类型，但是也会刷新数据，说明push方法在vue里面重写了，splice也是
                {
                    name:this.inputValue,
                    jay:false
                }
            )
            this.inputValue=""
        },
        deletes(ele){
            var a=this.list.indexOf(ele);
            if(a!=-1){
                this.list.splice(a,1)
            }
        },
        edittodo(todo){//双击
           this.edittingtodo=todo;//todo是在页面点击的，赋值给edittingtodo，然后在页面让edittingtogo==哪个元素就给添加class，然后点别的，edtd就会发生变化，就会回到false
           this.beforeedit=todo.name; //不能直接改变todo，因为todo是引用值，不会渲染页面
        },
        edited(){//回车
            this.edittingtodo="";
        },
        clee(todo){//esc
            todo.name=this.beforeedit;
            this.beforeedit="";
            this.edittingtodo="";
        }
    },
    directives:{//自定义指令
        focus:{
            update(el,bindding){
                // console.log(el)
                // console.log(bindding)
                if(bindding.value){
                    el.focus();
                }
            }
        }
    }
})
window.addEventListener("hashchange",function(){
    var myhash=window.location.hash.slice(1);
    vm.visbilit=myhash;
    console.log(vm.visbilit)
})

