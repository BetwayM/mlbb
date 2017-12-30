$(function(){
	var delParent;
	var url_head='http://120.79.21.205/mouyun';
	var defaults = {
		fileType         : ["jpg","png","bmp","jpeg","JPG"],   // 上传文件的类型
		fileSize         : 1024 * 1024 * 10                  // 上传文件的大小 10M
	};
	// function blobToDataURL(blob, callback,arr) {
	// 	var a = new FileReader();
	// 	a.onload = function (e) { callback(e.target.result); }
	// 	a.readAsDataURL(blob);
	// }
	// function callback(str,arr){
	// 	console.log(str);
	// 	getPhotoUrl(str,arr)
	// }
	// function getPhotoUrl(base,arr){
	// 	$.ajax({
	// 		type: 'POST',
	// 		url:url_head+'/app/picUpload',
	// 		data:{
	// 			imgData:base
	// 		},
	// 		dataType:"json",
	// 		cache: false,
	// 		success: function(data){
	// 				if(data.code==200){
	// 					photo=data.data;
	// 					console.log(photo);
	// 					arr.push(photo);
	// 					setTimeout(function(){
	// 						$(".up-section").removeClass("loading");
	// 						 $(".up-img").removeClass("up-opcity");
	// 					},450);
	// 				}else{
	// 					toastBG("图像上传失败！");	
	// 				}
	// 		},
	// 		error: function(e) { 
	// 			//跳转到错误页面
	// 			toastBG("发生错误");
	// 		} 
	// 	});
	// }
		/*点击图片的文本框*/
	$(".file").change(function(fileMe){
		console.log(fileMe)
		var idFile = $(this).attr("id");
		var file = document.getElementById(idFile);
		var imgContainer = $(this).parents(".z_photo"); //存放图片的父亲元素
		var fileList = file.files; //获取的图片文件
		console.log(JSON.stringify(fileList)+"======filelist=====");
		var input = $(this).parent();//文本框的父亲元素
		var imgArr = [];
		var imgArr2 = [];
		//遍历得到的图片文件
		var numUp = imgContainer.find(".up-section").length;
		var totalNum = numUp + fileList.length;  //总的数量
		if(fileList.length > 10 || totalNum > 10 ){
			alert("上传图片数目不可以超过10个，请重新选择");  //一次选择上传超过10个 或者是已经上传和这次上传的到的总数也不可以超过5个
		}
		else if(numUp < 10){
			fileList = validateUp(fileList);
			console.log(typeof fileList)
			
			for(var i = 0;i<fileList.length;i++){
				
								var imgUrl = window.URL.createObjectURL(fileList[i]);
								imgArr.push(imgUrl);
								var $section = $("<section class='up-section fl loading'>");
								imgContainer.prepend($section);
								var $span = $("<span class='up-span'>");
								$span.appendTo($section);
								var $img0 = $("<img class='close-upimg'>").on("click",function(event){
									event.preventDefault();
									event.stopPropagation();
									$(".works-mask").show();
									delParent = $(this).parent();
								});   
								$img0.attr("src","images/a7.png").appendTo($section);
								var $img = $("<img class='up-img up-opcity'>");
								$img.attr("src",imgArr[i]);
								$img.appendTo($section);
									var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
									$input.appendTo($section);
								var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
									$input2.appendTo($section);
									// 预览
									$(".up-section").on('click',function(){
										event.preventDefault();
										event.stopPropagation();
										var $src=$(this).find('.up-img').attr('src');
										var imgP=new Image();
										imgP.src=$src;
										var winW= $(window).width()
										var winH= $(window).height()
										var imgbili=imgP.height/imgP.width;
										$('#preview').attr('src',$src);
										$('#preview').css('width',winW-10);
										$('#preview').css('height',$('#preview').width()*imgbili);
										$('#preview').css('margin-top',-$('#preview').height()/2)
										$('.img_cover').show();
									});
						   }
						   var addNum=$('.up-opcity').length;//添加的个数
			for(var i = 0;i<fileList.length;i++){
				var photo;
				var a = new FileReader();
				a.onload = function (e) { 
					$.ajax({
						type: 'POST',
						url:url_head+'/app/picUpload',
						data:{
							imgData:e.target.result
						},
						dataType:"json",
						cache: false,
						beforeSend: function () {},
						success: function(data){
								if(data.code==200){
									photo=data.data;
									console.log(photo);
									var imgUrl = photo;
									$('.up-opcity').eq($('.up-opcity').length-1).attr('src',imgUrl)
								
									imgArr2.push(imgUrl);
									// setTimeout(function(){
										$(".up-section").eq($('.up-opcity').length-1).removeClass("loading");
										 $(".up-img").eq($('.up-opcity').length-1).removeClass("up-opcity");
									// },450);
								}else{
									toastBG("图像上传失败！");	
								}
						},
						error: function(e) { 
							//跳转到错误页面
							toastBG("发生错误");
						} 
					});
				 }				
				 a.readAsDataURL(fileList[i]);
				}
				
		}
		// setTimeout(function(){
        //      $(".up-section").removeClass("loading");
		//  	 $(".up-img").removeClass("up-opcity");
		//  },450);
		 numUp = imgContainer.find(".up-section").length;
		if(numUp >= 10){
			$(this).parent().hide();
		}
		
		//input内容清空
		$(this).val("");
	});
	
	
   
    $(".z_photo").delegate(".close-upimg","click",function(){
     	  $(".works-mask").show();
     	  delParent = $(this).parent();
	});
		
	$(".wsdel-ok").click(function(){
		$(".works-mask").hide();
		var numUp = delParent.siblings().length;
		if(numUp < 11){
			delParent.parent().find(".z_file").show();
		}
		 delParent.remove();
		
	});
	
	$(".wsdel-no").click(function(){
		$(".works-mask").hide();
	});
		
		function validateUp(files){
			var arrFiles = [];//替换的文件数组
			for(var i = 0, file; file = files[i]; i++){
				console.log(file)

				//获取文件上传的后缀名
				var newStr = file.name.split("").reverse().join("");
				if(newStr.split(".")[0] != null){
						var type = newStr.split(".")[0].split("").reverse().join("");
						console.log(type+"===type===");
						if(jQuery.inArray(type, defaults.fileType) > -1){
							// 类型符合，可以上传
							if (file.size >= defaults.fileSize) {
								alert(file.size);
								alert('您这个"'+ file.name +'"文件大小过大');	
							} else {
								// 在这里需要判断当前所有文件中
								arrFiles.push(file);	
							}
						}else{
							alert('您这个"'+ file.name +'"上传类型不符合');	
						}
					}else{
						alert('您这个"'+ file.name +'"没有类型, 无法识别');	
					}
			}
			return arrFiles;
		}
		

	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
