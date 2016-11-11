$(document).ready(function() {

    const handleError = (message) => {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }
    
    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
                $("#domoMessage").animate({width:'hide'},350);

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
    
        $("#domoMessage").animate({width:'hide'},350);
    
        if($("#domoName").val() == '' || $("#domoAge").val() == '') {
            handleError("RAWR! All fields are required!");
            return false;
        }

        sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());
        
        return false;
    });
  
    $("#deleteDomoSubmit").on("click", (e) => {
      console.log("In deleteDomo!");
      e.preventDefault();
      
      e.preventDefault();
    
        $("#domoMessage").animate({width:'hide'},350);
    
        
        if($("#theName").val() == '' || $("#theAge").val() == '') {
            handleError("RAWR! Name and age are required!");
            return false;
        }
        
        sendAjax($("#domoDeleteForm").attr("action"), $("#domoDeleteForm").serialize());
        
        return false;
    });
    
});