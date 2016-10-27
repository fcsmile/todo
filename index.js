$(function(){
    var hour=$('.hour');
    var min=$('.minute');
    var sec=$('.second');
    var add=$('.add');
    var right=$('.right');
    var input=$('input');
    var box=$('.box');
    var tleft=('.tleft');
    var ani=$('.ani');
    var star=$('.star');
    console.log(star)
    var todos=[];
    var delyi=$('.delyi');
    var delwei=$('.delwei');
    move();
    setInterval(move,1000);
    function move(){
        var time=new Date();
        var h=time.getHours();
        var mi=time.getMinutes();
        var s=time.getSeconds();
        h=h<10?"0"+h:h;
        mi=mi<10?"0"+mi:mi;
        s=s<10?"0"+s:s;
        hour.text(h);
        min.text(mi);
        sec.text(s);
    }
    input.on('blur',function () {
            value=input.val();
            console.log(value)
        if(value){
            input.val('')
        }
    });
    input.on('keyup',function(e){
        if(e.keyCode===13){
            value=input.val();
            console.log(value)
            todos.push({title:value,state:'0',isdel:0});
            localStorage.data=JSON.stringify(todos);
            render()
            if(value){
                input.val('')
            }
        }
    })
    star.on('click',function(){
        todos.push({title:value,state:'0',isdel:0});
        localStorage.data=JSON.stringify(todos);
        render()
    })
   ani.on('click',function () {
        todos.push({title:value,state:'0',isdel:0});
        localStorage.data=JSON.stringify(todos);
        render()
    });
    if(localStorage.data){
        todos=JSON.parse(localStorage.data);
        render();
    }else{
        localStorage.data=JSON.stringify(todos);
    }
    function render(){
        $('.addcon').empty();
        $.each (todos,function(i,v){
            $('<li class="xinzen"><div class="mibox"><span class="span">'+v.title+'</span><div class="del icon-font1 icon-delete"></div></div></li>').addClass(function(){
                if(v.state==1){
                    return 'done';
                }
            }).appendTo('.addcon');
        })
        $('<div class="delyi">删除已读</div><div class="delwei">删除未读</div>').appendTo('.addcon');

    }
    var left=null;
    var flag=true;
    $('.addcon').on('touchstart','.xinzen',function (e) {
        left=e.originalEvent.changedTouches[0].pageX;
        console.log(left)
    });
    $('.addcon').on('touchmove','.xinzen',function (e) {
        now=e.originalEvent.changedTouches[0].pageX;
        var x=now-left;
        if(x>40){
            $(this).css('transform','translate3d('+x+'px,0,0)')
            flag=false;
        }
        if(x<40){
            $(this).css('transform','translate3d('+x+'px,0,0)')
            flag=true;
            $(this).addClass('delete');
        }
        console.log(now)
        console.log(x)
    });
    console.log(todos)
    $('.addcon').on('touchend','.xinzen',function(e){
        if(!flag){
            $(this).css('transition','transform ease .3s');
            $(this).css('transform','translate3d(0,0,0)');
            var shuzi=$(this).index();
            todos[shuzi].state='1';
            console.log(todos[shuzi].state);
            $(this).addClass('done');
            localStorage.data=JSON.stringify(todos);
            $(this).delay(800).queue(function(){
                $(this).css('transition','none').dequeue();
            })
        }
        if(flag){
            $(this).css('transition','transform ease .3s');
            $(this).css('transform','translate3d(0,0,0)');

            $(this).delay(800).queue(function(){
                $(this).css('transition','none').dequeue();
            })
        }
    });
    $('.addcon').on('click','.icon-delete',function(e){
        e.stopPropagation()
        var i=$(this).closest('li').index();
        console.log(i);
        todos.splice(i,1);
        localStorage.data=JSON.stringify(todos);
        $(this).closest('li').remove();
    });
    var pan;
    function back(){
        $('.home').text('');
        $('.ani').addClass('icon-3');
        $('.share').text('');
        $('.tanchu').remove()
    }
    $('.addcon').on('click','.xinzen',function (e) {
        e.stopPropagation()
        $('<div class="tanchu"><ul class="tannei"><textarea name="" id="" cols="30" rows="10" class="tanmid"></textarea></ul></div>').appendTo('body');
        pan=$(this).index();
        var spantext=$('.span').eq($(this).index()).text();
        $('.tanmid').text(spantext);
        ani.removeClass('icon-3');
        $('.home').text('同步');
        $('.share').text('关闭')
    });
    $('.home').on('touchstart',function(){
        var ol=$('.tanmid').val();
        $('.span').eq(pan).text(ol);
        todos[pan].title=ol;
        localStorage.data=JSON.stringify(todos);
        render();
        back()
    });
    $('.share').on('touchstart',function(){
        back()
    });
    $('.left').on('touchstart',function () {
        $('.tanchu').remove();
        back()
    });

    $('.addcon').on('touchstart','.delyi',function(){
        var b=0;

        console.log(todos);
        $.each(todos,function(i,v){
            if(v.state==1){
                todos.splice(i-b,1)
                b++;
            }
        })
        localStorage.data=JSON.stringify(todos);
        render()
    });
    $('.addcon').on('touchstart','.delwei' ,function(){
        var b=0;

        console.log(todos);
        $.each(todos,function(i,v){
            if(v.state!=1){
                todos.splice(i-b,1)
                b++;
            }

        })
        localStorage.data=JSON.stringify(todos);
        render()
    })
});