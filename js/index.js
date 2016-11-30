$(function(){

    $(".fullpage").mousedown(function(e){
        e.preventDefault();
    })
    $(".fullpage").mousemove(function(e){
        e.preventDefault();
    })

    var ch=$(window).height();
    var num=0;
    var flag=true;

    function up(){
        if(!flag){
            return;
        }
        num++;
        if(num == $(".section").length){
            num=$(".section").length-1;
            return num;
        }
        flag=false;
        $(".fullpage").css({
            marginTop:-num*ch
        })
        $(".point").removeClass("active").eq(num).addClass("active");
    }
    function down(){
        if(!flag){
            return;
        }
        num--;
        if(num < 0){
            num=0;
            return num;
        }

        flag=false;
        $(".fullpage").css({
            marginTop:-num*ch
        })
        $(".point").removeClass("active").eq(num).addClass("active");
    }
    touch.on("body","swipeup",".fullpage",function(e){
        up();
        e.preventDefault();
    })
    touch.on("body","swipedown",".fullpage",function(e){
        down();
        e.preventDefault();

    })
    $(".fullpage")[0].addEventListener("webkitTransitionEnd",function(){
        flag=true;

        $(".section").each(function(index,obj){

                if(index == num){
                    $(obj).find(".leftmove").css({
                        animation:"leftmove 1s ease forwards"
                    })
                    $(obj).find(".rightmove").css({
                        animation:"rightmove 1s ease forwards"
                    })
                }else{
                    $(obj).find(".leftmove").css({
                        animation:"none"
                    })
                    $(obj).find(".rightmove").css({
                        animation:"none"
                    })
                }
        })
    })


    $(".next-page").click(function () {
        up();
    })

    // $(document).mousewheel($(".fullpage"),up,down);


    if(num>0){
        $(".leftmove").css({
            animation:"leftmove 3s ease forwards"
        })
        $(".rightmove").css({
            animation:"rightmove 3s ease forwards"
        })
    }else{
        $(".leftmove").css({
            animation:"none"
        })
        $(".rightmove").css({
            animation:"none"
        })
    }


    var Nflag=true;
    $(".nav").click(function(){
        if(Nflag){
            $(this).find("span:nth-child(1)").css({
                transform:"translateY(10px) rotate(-45deg)"
            })
            $(this).find("span:nth-child(2)").css({
                transform:"rotate(45deg)"
            })
            $(this).find("span:nth-child(3)").css({
                transform:"scale(0)"
            });
            $(".min-menu").slideToggle();
            Nflag=false;
        }else{
            $(this).find("span:nth-child(1)").css({
                transform:"none"
            })
            $(this).find("span:nth-child(2)").css({
                transform:"none"
            })
            $(this).find("span:nth-child(3)").css({
                transform:"scale(1)"
            });
            $(".min-menu").slideToggle();
            Nflag=true;
        }
    })


    $(window).resize(function(){

        var shuju=document.body.getBoundingClientRect();
        $(".section").width=shuju.width;
        $(".section").height=shuju.height;

        var w=$(window).width();
        if( w>= 1000){
            $(".min-menu").hide();
            $(".nav").find("span:nth-child(1)").css({
                transform:"none"
            })
            $(".nav").find("span:nth-child(2)").css({
                transform:"none"
            })
            $(".nav").find("span:nth-child(3)").css({
                transform:"scale(1)"
            });
            Nflag=true;
        }
    })

    $(".point").click(function(){
        var index=$(this).index();
        // console.log(index)
        for(var i=0;i<$(".section").length-1;i++){
            if(index>i){
                num=index-1;
                up();
            }else if(index<i){
                num=index-1;
                down();
            }else{
                return
            }
        }
        $(".point").removeClass("active").eq(index).addClass("active");
    })
})