function Register(){
	this.username();
	this.tel();
	this.password();
	this.repassword();
	this.regis();
}

$.extend(Register.prototype,{
     username:function(){
     	$("#username").on("focus",function(){
		 		$(".usna").css({
		 			border:"1px solid #a5a5a5"
		 		}).text("4-20个字符，支持汉字、字母、数字及“-”、“_”组合");
		 	})
		 	$("#username").on("blur",function(){
		 		var $reg1=/^([\u4e00-\u9fa5]|[\w\-]){4,20}$/;
		 		var $name=$(this).val();
		 		if($(this).val()==""){
		 			$(".usna").css({
		 			border:"1px solid red"
		 		}).text("请输入用户名");
		 		}else{
		 			if($reg1.test($(this).val())){
		 			 $.ajax({
					         type:'post',
						     url:'/superregister',
							 data:{
								name:$name
								}
							 }).done(function(data){
							 	console.log(data)
									if(data){
										$(".usna").css({
							 			border:"1px solid red"
							 		    }).text("用户名已经存在");
									}else{
										$(".usna").css({
							 			border:"1px solid green"
							 		    }).text("√");
									}
								}).fail(function(){
								})
						}else{
						    $(".usna").css({
				 			border:"1px solid red"
				 		    }).text("格式不正确");
						}
			     }
		 		})
     },


     tel:function(){
     		$("#tel").on("focus",function(){
     				 		$(".cn").css({
     				 			border:"1px solid #a5a5a5"
     				 		}).text("请输入13或14或15或18开头的11位手机号");
     				 	});
     				 	$("#tel").on("blur",function(){
     				 		var $pattern=/^((13[0-9])|(14[5|7])(15([0-3]|[5-9]))|(18[05-9]))\d{8}$/;
     				 		var $cellvalue=$(this).val();
     				 		if($cellvalue==""){
     				 			$(".cn").css({
     				 			border:"1px solid red"
     				 		}).text("请输入手机号");
     				 		}else{
     				 			if($pattern.test($cellvalue)){
     				 			$(".cn").css({
     				 			border:"1px solid green"
     				 		}).text("√");
     				 		}else{
     				 			$(".cn").css({
     				 			border:"1px solid red"
     				 		}).text("请输入正确格式的手机号");
     				 		}
     				 		}
     				 	});
     },
     password:function(){
     		$("#password").on("focus",function(){
		 		$(".pw").css({
		 			border:"1px solid #a5a5a5"
		 		}).text("6-20个字符，建议由字母、数字与符号两种以上组成");
		 	})
		 	$("#password").on("blur",function(){
		 		$(".sec").hide();
		 		var $passvalue=$(this).val();
		 		var $reg2=/^.{6,20}$/;
		 		if($(this).val()==""){
		 			$(".pw").css({
		 			border:"1px solid red"
		 		}).text("请输入密码");
		 		}else{
		 			if($reg2.test($passvalue)){
		 				var $j=0;
		 				for(var $i=0;$i<$passvalue.length;$i++){
		 					if($passvalue.charAt(0)==$passvalue.charAt($i)){
		 						$j++;
		 					}
		 				}
		 				if($j==$passvalue.length){
		 					$(".pw").css({
			 			border:"1px solid green"
			 		    }).text("不能为同一字符");
		 				}else{
		 					$(".pw").css({
			 			border:"1px solid green"
			 		    }).text("√");
		 				}	
		 			}else{
		 				$(".pw").css({
			 			border:"1px solid red"
			 		    }).text("密码格式不正确");
		 			}
		 		}
		 	});
     },
     repassword:function(){
     	$("#repassword").on("focus",function(){
		 		$(".su").css({
		 			border:"1px solid #a5a5a5"
		 		}).text("请再次输入密码");
		 	})
		 	$("#repassword").on("blur",function(){
		 		var $sure=$("#repassword").val();
		 		if($("#password").val()==$sure){
		 			$(".su").css({
			 			border:"1px solid green"
			 		    }).text("√");
		 		}else{
		 			if($sure==""){
		 				$(".su").css({
		 			border:"1px solid red"
		 		}).text("请输入密码,密码不能为空");
		 			}else{
		 				$(".su").css({
		 			border:"1px solid red"
		 		}).text("两次密码不一致");
		 			}
		 		}
		 		
		 	});
     },
     regis:function(){
     	$("#btn").on("click",function(){
     		var $username=$("#username").val();
     		var $tel=$("#tel").val();
     		var $password=$("#password").val();
     		var $usna=$(".usna").text();
     		var $pw=$(".pw").text();
     		var $cn=$(".cn").text();
     		var $su=$(".su").text();
     		$.ajax({
					         type:'post',
						     url:'/superregister/zhuce',
							 data:{
								username:$username,
								tel:$tel,
								password:$password,
								usna:$usna,
								pw:$pw,
								cn:$cn,
								su:$su
								}
							 }).done(function(data){
							 	if(data){
							 		window.location.href="/superlogin";
							 	}else{
							 		window.location.href="/superregister";
							 	}
								}).fail(function(){
								})
     	})
     }
})

new Register();