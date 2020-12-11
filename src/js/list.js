class List{
    constructor(){
        //获取上箭头
        this.onarrows = $('.good-increase');
        //获取下箭头
        this.uparrows = $('.good-decrease');
        //获取购买车钮
        this.buy = $('.good-addcart');
        //获取购物车按钮
        this.cart = $('#cart');
        //获取总数
        this.sum = $('.t_cart_num');
        //添加事件
        this.addEvent();
        this.init();
    }
    addEvent(){
        let _this = this;
        this.$cart.on('click',function(){
            location.href = 'cart.html';
        });
        this.$buy.each(function(i,value){
            $(value).on('click',function(event){
                //获取id
                let id = $(this).parents('li').attr('data-good-id');
                //获取src
                let src = $(this).parents('li').find('img').attr('src');
                //获取价格
                let price = $(this).parents('li').find('.good-price').text();
                //获取名字
                let name = $(this).parents('li').find('.good-name').text();

                //获取cookie
                let cookie_str = $.cookie('carts') ? $.cookie('carts') : '';

                //转对象
                let cookie_obj = _this.convertStrToObj(cookie_str);

                //in
                if(id in cookie_obj){
                    cookie_obj[id].num ++;
                }else{
                    cookie_obj[id] = {
                        name,
                        price,
                        src,
                        num : 1
                    }
                }
                //加入cookie
                $.cookie('carts',JSON.stringify(cookie_obj),{expires : 5,path : '/'});
            })
        })
        this.onarrows.each(function(i,v){
            $(v).click(function(){
                
            })
        })
    }
    
    convertStrToObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
    init(){
        //获取cookie
        let cookie_str = $.cookie('carts') ? $.cookie('carts') : '';
        //转对象
        let cookie_obj = this.convertStrToObj(cookie_str);
        let sum = 0;
        for(let key in cookie_obj){
            sum += cookie_obj[key].num;
        }
        this.$cart.val(`购物车(${sum})`);
        let $minus = $('.good-increase');
        $minus.each(function(i,value){
            $(value).click(function(){
                //获取id
                let id = $(this).parents('.goodInfo').attr('data-good-id');
                //获取cookie
                let cookie_str = $.cookie('carts') ? $.cookie('carts') : '';
                // 转对象
                let cookie_obj = _this.convertStrToObj(cookie_str);
                if(cookie_obj[id].num > 1){
                    cookie_obj[id].num ++;
                }
                $.cookie('carts',JSON.stringify(cookie_obj),{expires : 5,path : '/'});
                $(this).next().val(cookie_obj[id].num);
                $(this).parent().next().text(cookie_obj[id].price * cookie_obj[id].num);
            })
        })
    }
}
new List();