$(document).ready(function() {

    const handleError = (message) => {
        $("#errorMessage").text(message);
        $("#wizMessage").animate({width:'toggle'},350);
    }
    
    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
                $("#wizMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: (xhr, status, error) => {
                const messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeDomoSubmit").on("click", (e) => {
        e.preventDefault();
    
        $("#wizMessage").animate({width:'hide'},350);
    
        if($("#domoName").val() == '' || $("#domoAge").val() == '') {
            handleError("Please enter all information.");
            return false;
        }

        sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());
        
        return false;
    });
  
   $(".editCharacter").on("click", (e) => {
        e.preventDefault();

        $("#wizMessage").animate({width:'hide'},350);
     
        sendAjax($("#editQuery").attr("action"), $("#editQuery").serialize());

        return false;
    });
  
    $("#deleteDomoSubmit").on("click", (e) => {
      
        e.preventDefault();

        $("#wizMessage").animate({width:'hide'},350);


        if($("#theName").val() == '' || $("#theAge").val() == '') {
            handleError("You are missing some details.");
            return false;
        }

        sendAjax($("#domoDeleteForm").attr("action"), $("#domoDeleteForm").serialize());

        return false;
    });
    
});