(function(){
    $('#contact_submit').on("click", function(event){
            alert('Thx');
               var proceed = true;
               //simple validation at client's end
               //loop through each field and we simply change border color to red for invalid fields
               $("#myContactForm input[required=true], #myContactForm textarea[required=true]").each(function(){
                   $(this).css('border-color','');
                   if(!$.trim($(this).val())){ //if this field is empty
                       $(this).css('border-color','red'); //change border color to red
                       $(this).on("keyup", function(){
                            $(this).css('border-color','');
                        });
                       proceed = false; //set do not proceed flag
                   }

                   //check invalid email
                   var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                   if($(this).attr("type")==="email" && !email_reg.test($.trim($(this).val()))){
                       $(this).css('border-color','red'); //change border color to red
                       $(this).on("keyup", function(){
                            $(this).css('border-color','');
                        });
                       proceed = false; //set do not proceed flag
                   }
            });


            if(proceed){ // If everything looks good! proceed...
                    $("#feedbkLoader").show("slow");
                    event.preventDefault();
                    $.ajax({
                        type: 'POST',
                        url: 'verify.php',
                        data: {
                            user_first : $("#con_fname").val(),
                            user_last  : $("#con_lname").val(),
                            user_email : $("#con_email").val(),
                            user_comnt : $("#con_message").val(),
                            spamBot_trick : $("#spamControl").val()
                            },
                        dataType: 'json',
                        success: function (data){
                            $("#feedbkLoader").hide();
                            if (data.e_msg) {
                                $('#feedbkText').removeClass().addClass("error");
                                $('#feedbkText').html(data.e_msg);
                            }
                            if (data.s_msg) {
                                $('#feedbkText').removeClass().addClass("success");
                                $('#feedbkText').html(data.s_msg);
                            }
                        },
                        error: function (data){
                            $("#feedbkLoader").hide();
                            $('#feedbkText').removeClass().addClass("error");
                            $('#feedbkText').html("Sorry, your details can not be submitted now, due to maintenance. Please try later.");
                            $('#feedbkText').removeClass().addClass("neutral");
                            $('#feedbkText').html(data.e_msg); /* For Debuging only! */
                        }
                    });
            } //End of if proceed

        }); // End of contact submit click
})(); //End of IIFE


