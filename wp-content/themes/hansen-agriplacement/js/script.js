(function ($) {
	$(window).setBreakpoints({
		distinct: true,
		breakpoints: [
			320,
			768,
			1100
		]
	});

	$(window).bind('enterBreakpoint320',function() {
		console.log("running 320 breakpoint");
		$("footer.main .rcol .npasmall").appendTo($("footer.main .rcol"));
		$("header.main .innerwrapper .login").appendTo($("header.main nav.main"));
		convertJobListingToMobile($("#featuredjobs table"));
	});


	$(window).bind('enterBreakpoint768',function() {
		console.log("running 768 breakpoint");
		$("header.main .innerwrapper .login").appendTo($("header.main nav.main"));
		$("footer.main .rcol .npasmall").prependTo($("footer.main .rcol"));
		$("header.main .innerwrapper .login").appendTo($("header.main nav.main"));
		$("header.main .innerwrapper .account").appendTo($("header.main nav.main"));
		$("#featuredjobs .mobilelisting").remove();

	});

	$(window).bind('enterBreakpoint1100',function() {
		console.log("running 1100 breakpoint");
		$("footer.main .rcol .npasmall").prependTo($("footer.main .rcol"));
		$("header.main nav.main .login").appendTo($("header.main .innerwrapper"));
		$("header.main nav.main .account").appendTo($("header.main .innerwrapper"));
		$("header.main nav.main").removeClass('active');
	});

	$(document).ready(function () {
		"use strict";
		

		if(window.location.pathname == "/contact-us/"){
			$(".page .content a[href^=tel], .page .content a[href^=mailto]").click(function(){
				try {
					goog_report_conversion('VEhNCPiFyXoQ04Ts8wM');
					ga('send', 'event', { eventCategory: 'Action', eventAction: 'Click', eventLabel: 'Contact Us'});
					fbq('track', 'Contact Us', {
						value: 0.00,
						currency: 'USD'
					});
				} catch (err) {
					console.warn("There was problem with analytics", err);
					Raven.captureMessage("Analytics Error: Contact Us Click", {
						level: "error",
						extra:  {
							error: err
						}
					});
				}
				
			});
		}

		$("a.phone").click(function(){
			try {
				goog_report_conversion('QPlWCLmvsnoQ04Ts8wM');
				ga('send', 'event', { eventCategory: 'Call', eventAction: 'Click', eventLabel: 'Lead'});
				fbq('track', '308.382.7350', {
					value: 0.00,
					currency: 'USD'
				});
			} catch (err) {
				console.warn("There was problem with analytics", err);
				Raven.captureMessage("Analytics Error: Phone Number Click", {
					level: "error",
					extra:  {
						error: err
					}
				});
			}
			
		});

		$("header.main nav.main ul").superfish();
		
		$("#heroimage .slider").slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: 9000,
			lazyLoad: 'ondemand',
			fade: true
		});

		$("#loginpanel #loginform").prepend($("#loginpanel .invalidPwd"));
		if($("#loginpanel .invalidPwd").length != 0){
			if($(window).outerWidth() >= 1100){
				$("#signinbtn").addClass('active');
				$("#loginpanel.login").addClass('active');
			}else{
				$("#mobilemenubtn").addClass('active');
				$("header.main nav.main").addClass('active');
				
				if($(window).outerWidth() < 768){
					$("nav.main.active .nav").hide();
					$("nav.main.active #loginpanel").show();    
				}          
			}              
		}
		
		$("nav.main #loginpanel .btn_cancellogin").click(function(){
			$("nav.main.active .nav").show();
			$("nav.main.active #loginpanel").hide();  
		});
		
		$("#mobile_login_btn").click(function(){
		$("nav.main.active .nav").hide();
			$("nav.main.active #loginpanel").show();        
		});

		$("#mobilemenubtn").click(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$("header.main nav.main").removeClass('active');
			}else{
				$(this).addClass('active');
				$("header.main nav.main").addClass('active');
			}
		});

		$("#signinbtn").click(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$("header.main .login").removeClass('active');
			}else{
				$(this).addClass('active');
				$("header.main .login").addClass('active');

			}
		});

		$("#accountbtn").click(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$("header.main .account").removeClass('active');
			}else{
				$(this).addClass('active');
				$("header.main .account").addClass('active');

			}
		});  

		$("#btnResetPassword").click(function(){
			var email = $("#forgotpasswordform input[name='accountemail']").val();
			if(email == ""){
				alert("You must enter your account email address.");
				return false;
			}
			
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: hansenapi + "/api/v1/account/reset",
				dataType: 'json',
				data: JSON.stringify({email: email}),
				success: function(response){
					if(response.status == "OK"){
						alert("A password reset confirmation email has been sent to your email address.");
						window.location.href = "/";
					}
				},
				error: function(jqxhr, textStatus, errorThrown){	
					Raven.captureMessage("Error: Send Password Reset", {
						level: "error",
						extra:  {
							textStatus: textStatus,
							errorThrown: errorThrown							
						}
					});				
					alert(jqxhr.responseJSON.message);
				}
			});			
		});

		$("#btnSetPassword").click(function(){
			var password = $("#forgotpasswordform input[name='newpassword']").val();
			var passwordconfirm = $("#forgotpasswordform input[name='newpassword_confirm']").val();
			var token = $("#forgotpasswordform input[name='_token']").val();

			if(password.length >= 6){
				if(password == passwordconfirm){
					$.ajax({
						type: "POST",
						contentType: "application/json; charset=utf-8",
						url: hansenapi + "/api/v1/account/password",
						dataType: 'json',
						data: JSON.stringify({
							password: password,
							token: token
						}),
						success: function(response){
							if(response.status == "OK"){
								alert("Your account password has been reset.");
								window.location.href = "/";
							}
						},
						error: function(jqxhr, textStatus, errorThrown){	
							Raven.captureMessage("Error: Password Reset", {
								level: "error",
								extra:  {
									textStatus: textStatus,
									errorThrown: errorThrown									
								}
							});				
							alert(jqxhr.responseJSON.message);
						}
					});	
				}else{
					alert("Both passwords must be the same.");
					$("#forgotpasswordform input[name='newpassword_confirm']").val("");
				}
			}else{
				alert("Passwords must be 6 characters or longer.");
				$("#forgotpasswordform input[name='newpassword']").val("");
				$("#forgotpasswordform input[name='newpassword_confirm']").val("");
			}
		});

		if($("#btn_jobapply").length != 0){
			if(Cookies.get('hansentoken') !== undefined && Cookies.get('hansentoken') != ""){
				var jobid = $("#job_id").val();
				$.ajax({
					type: "GET",
					contentType: "application/json; charset=utf-8",
					url: hansenapi + "/api/v1/jobs/" + jobid + "/check",				
					dataType: 'json',
					beforeSend: function(request){
						request.setRequestHeader('Authorization', "BEARER " + Cookies.get('hansentoken'))
					},				
					success: function(response){
						console.log(response);
						if(response.status == "OK"){
							if(response.applied == 1){
								$("#btn_jobapply").text("Applied");
								$("#btn_jobapply").attr("disabled", "disabled");
								$("#btn_jobapply").unbind();
							}else{
								if(response.inqueue){								
									$("#btn_jobapply").text("View Application");
									$("#btn_jobapply").unbind();
									$("#btn_jobapply").attr("href", "/application");
								}
							}
						}
					},
					error: function(jqxhr, textStatus, errorThrown){
						Raven.captureMessage("Error: Job Application Check", {
							level: "error",
							extra:  {
								textStatus: textStatus,
								errorThrown: errorThrown,
								jobid: jobid
							}
						});
					}
				})
			}			
		}

		$("#btn_jobapply").click(function(){
			var jobid = $("#job_id").val();

			//Check application status first

			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				url: hansenapi + "/api/v1/account/auth",
				dataType: 'json',
				beforeSend: function(request){
					request.setRequestHeader('Authorization', "BEARER " + Cookies.get('hansentoken'))
				},				
				success: function(response){
					if(response.status == "OK"){
						if(response.application != null){
							if(response.application.is_information_complete){
								var jobtitle = $("#positionTitle").text().replace("Job Title: ", "");
								alertify.okBtn("Apply").cancelBtn("Cancel").confirm("Do you want to apply for <strong>" + jobtitle + "</strong>?", function(ev){
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8",
										url: hansenapi + "/api/v1/jobs/" + jobid + "/apply",				
										dataType: 'json',
										data: JSON.stringify({
											applynow: true,
											jid: jobid
										}),
										beforeSend: function(request){
											request.setRequestHeader('Authorization', "BEARER " + Cookies.get('hansentoken'))
										},				
										success: function(response){
											alertify.okBtn("Ok").alert("Application submitted!", function(){
												window.location.reload();
											});
										},
										error: function(jqxhr, textStatus, errorThrown){
											Raven.captureMessage("Error: Job Application Apply", {
												level: "error",
												extra:  {
													textStatus: textStatus,
													errorThrown: errorThrown,
													jobid: jobid
												}
											});
											alertify.okBtn("OK").alert("We were not able to apply for this job " + textStatus, function(){
												
											});
										}
									});
	
									ev.preventDefault();
								}, function(ev){
									ev.preventDefault();
								})
	
							}else{
								alertify.confirm("You must finish your application before you can finish applying.", function(){
									$.ajax({
										type: "POST",
										contentType: "application/json; charset=utf-8",
										url: hansenapi + "/api/v1/jobs/" + jobid + "/apply",				
										dataType: 'json',
										beforeSend: function(request){
											request.setRequestHeader('Authorization', "BEARER " + Cookies.get('hansentoken'))
										},				
										success: function(response){
											window.location = "/application";
										},
										error: function(jqxhr, textStatus, errorThrown){
											Raven.captureMessage("Error: Job Application Apply", {
												level: "error",
												extra:  {
													textStatus: textStatus,
													errorThrown: errorThrown,
													jobid: jobid
												}
											});
											alertify.alert("We were not able to apply for this job " + textStatus, function(){
												
											});
										}
									})
								}, function(){
	
								});
							}
						}else{
							alertify.confirm("You must start your application before you can apply for jobs.", function(){
								window.location = "/application";
							}, function(){

							});
						}						
					}
				},
				error: function(jqxhr, textStatus, errorThrown){
					Raven.captureMessage("Error: Job Application Auth", {
						level: "error",
						extra:  {
							textStatus: textStatus,
							errorThrown: errorThrown
						}
					});
					alertify.alert("We were not able to apply for this job " + textStatus, function(){
						
					});
				}
			})

			
		});

		$("#btn_referafriend").click(function(){
        var message = "Check out Hansen Agri-PLACEMENT for the latest ag industry related positions and candidates.\n\nhttp://hansenagriplacement.com";
        if($("#jobdetails").length != 0){
            message = "This may be a position you are interested in:\n\n" + $("#positionTitle").text() + "\n\nLocation: " + $("#jobLocation").text() + "\nSalary Range: " + $("#jobSalaryRange").text() + "\n\n";
            message += "To read more, visit: " + window.location.href;
        }
        
       var content = "<h1>Refer a Friend</h1><p>Fill out the form below to send this page to a friend:</p><form><div class='formrow'><input type='text' name='yourname' placeholder='Your Name' /></div><div class='formrow'><input type='text' name='name' placeholder='Friends Name' /></div><div class='formrow'><input type='text' name='email' placeholder='Friends Email' /></div><div class='formrow'><textarea name='message'>" + message + "</textarea></div><div class='formrow'><input type='submit' value='Send to Friend' class='button' /></div></form>";
       modalWindow(content);
       $("#modalcontainer form").submit(function(){
           if(!$(this).hasClass('active')){
               console.log($(this).serializeObject());
                var data = $(this).serializeObject();
                var valid = true;
                
                if(data.email == "" || data.message == "" || data.name == "" || data.yourname == ""){
                    valid = false;
                }
            
                if(!valid){
                    alertify.alert("You must fill in all of the fields.");
                }else{
                    $(this).append("<div class='loading'></div>");
                    
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: hansenapi + "/api/v1/jobs/sendreferral",
                        data: JSON.stringify({'referral': data}),
                        dataType: 'json',
                        success: function(response){
							try {
								fbq('track', 'Refer A Friend', {
									value: 0.00,
									currency: 'USD'
								});
								ga('send', 'event', { eventCategory: 'Form', eventAction: 'Submit', eventLabel: 'Refer A Friend'});
								goog_report_conversion('UO1wCPmMyXoQ04Ts8wM');
							} catch (err) {
								console.warn("There was problem with analytics", err);
								Raven.captureMessage("Analytics Error: Send to a Friend", {
									level: "error",
									extra:  {
										error: err
									}
								});
							}
							
                            alertify.alert("Your message has been sent to " + data.name, function(){
                                $("#modalcontainer").remove();
                            });
                        },
                        error: function(jqxhr, textStatus, errorThrown){
							Raven.captureMessage("Error: Job Opening Referral", {
								level: "error",
								extra:  {
									textStatus: textStatus,
									errorThrown: errorThrown
								}
							});
                            alertify.alert("We were not able to send the referral email: " + textStatus, function(){
                                $("#modalcontainer form .loading").remove();
                            });
                        }
                    })
                }
           }
            
            return false; 
       });
    });
	});

	$(window).load(function () {
		"use strict";
	});

	function modalWindow(content, loading){
		var contenthtml = "";
		
		if(loading){
			
		}else{
			contenthtml = "<div id='modalcontainerwrapper'><a id='btn_modalclose'><i class='fa fa-times'></i></a><div class='content'>" + content + "</div></div>";
		}   
		
		var modalhtml = "<div id='modalcontainer'>" + contenthtml + '</div>';
		
		$('body').append(modalhtml);
		$("#btn_modalclose").click(function(){
			$("#modalcontainer").remove();
		});
	}

	function convertJobListingToMobile(tableElement){
		var template = "<article class='mobilelisting'><header class='main'><div class='jobid'></div><h1></h1></header><table><tbody></tbody<</table></article>";
		
		$(tableElement).find("tbody tr").each(function(index, element){
			console.log(element);
			console.log($(element).find("td:nth-child(1)").text());
			var entry = $(template).clone();
			console.log($(entry).find('header .jobid'));
			$(entry).find('header .jobid').html($(element).find("td:nth-child(1)").html());
			$(entry).find('header h1').html($(element).find("td:nth-child(2)").html());
			var locationrow = "<tr><td style='width:35%'>Location</td><td>" + $(element).find("td:nth-child(3)").text() + "</td></tr>";
			var salaryrow = "<tr><td style='width:35%'>Salary</td><td>" + $(element).find("td:nth-child(4)").text() + "</td></tr>";
			$(entry).find('table tbody').append(locationrow);
			$(entry).find('table tbody').append(salaryrow);       
			
			$(entry).insertAfter($(tableElement));
		});
	} 
	

})(jQuery);