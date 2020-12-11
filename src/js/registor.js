window.onload = function(){
    let arr = [false,false,false,false,false];
    $('#reg-number').blur(function(){
        let re = /^(15|13|17|19)\d{9}$/;
        if(re.test($(this).val())){
            arr[0] = true;
            $('#number').css("display","none");
        }else{
            arr[0] = false;
            $('#number').css("display","block");
        }
    })
    $('#reg-imgbar').blur(function(){
        let re = /^\d{4}$/;
        if(re.test($(this).val())){
            arr[1] = true;
            $('#imgbar').css("display","none");
        }else{
            arr[1] = false;
            $('#imgbar').css("display","block");
        }
    })
    $('#reg-msgbar').blur(function(){
        let re = /^\d{6}$/;
        if(re.test($(this).val())){
            arr[2] = true;
            $('#msgbar').css("display","none");
        }else{
            arr[2] = false;
            $('#msgbar').css("display","block");
        }
    })
    $('#reg-pw').blur(function(){
        let re = /^\w{6,12}$/;
        if(re.test($(this).val())){
            arr[3] = true;
            $('#pw').css("display","none");
        }else{
            arr[3] = false;
            $('#pw').css("display","block");
        }
    })
    $('#reg-pw-again').blur(function(){
        let re = /^\w{6,12}$/;
        if(re.test($(this).val())){
            arr[4] = true;
            $('#again').css("display","none");
        }else{
            arr[4] = false;
            $('#again').css("display","block");
        }
    })
    $('.gonext').click(function(){
        if(arr.indexOf(false) === -1){
            let user = $('#reg-number').val();
            let upwd  = $('#reg-pw').val();
            
            let cookie_str = getCookie('users') ? getCookie('users'):'';
            let cookie_obj = convertStrToObj(cookie_str);

            if(user in cookie_obj){
                alert("此手机号已经注册");
                return;
            }else{
                cookie_obj[user] = upwd;
                alert('注册成功，请登录');
                createCookie('users',JSON.stringify(cookie_obj),{expires : 10,path : '/'});
            }
        }else{
            alert('信息不完整');
        }
    })
}
function convertStrToObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}