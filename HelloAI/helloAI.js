
let usrPrompt=document.querySelector("#prompt")
let submitButton=document.querySelector("#submit")
let chatContainer=document.querySelector(".chatContainer")
let imageButton=document.querySelector("#image")
let image=document.querySelector("#image img")
let imageInput=document.querySelector("#image input")


const apiURL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDDzWF9-uaCELcooxUaXopPY4rlFmiHtSk"

let user={
    message:null,
    file:{"mime_type": null,
            "data": null

    }

}


async function generateResponse(aiChatBox) {

    let text=aiChatBox.querySelector(".aiChatArea")
    let RequestOption={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            "contents": [
                {"parts":[{"text":user.message},(user.file.data?[{"inline_data":user.file}]:[])
                ]
              }]
             })
    }

    try{

        let response= await fetch(apiURL,RequestOption)
        let data=await response.json()
        let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        text.innerHTML=apiResponse
    }
    
    catch(error){
        console.log(error);
    }

    finally{ chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})}
    image.src="img.svg"
    image.classList.remove("selectedimage")
    user.file={}
           
} 

function createChatBox(html,classes){
       let div=document.createElement("div")
       div.innerHTML=html
       div.classList.add(classes)
       return div

    }


function chatResponse(userPrompt){
    user.message=userPrompt
    let html =`<img src="user icon.png" alt="" id="userIcon"  width="15%">
                <div class="userChatArea">
                <p>${user.message}</p>
                ${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" alt="" class="userImage">`:``}
                </div>`
         usrPrompt.value=""
     
        let userChatBox=createChatBox(html,"user-chat-box") 
        chatContainer.appendChild(userChatBox)  
        
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})


        
        setTimeout(()=>{
            let html=`<img src="AI icon.png" alt="" id="AiIcon" width="10%">
               <div class="aiChatArea">
               <img src="loading2.webp" alt="" class="loading" width="50px">
               </div>`

               let aiChatBox=createChatBox(html,"ai-chat-box")
               chatContainer.appendChild(aiChatBox)
               generateResponse(aiChatBox)

        },600)
}



usrPrompt.addEventListener("keydown",(e)=>{
    if (e.key=="Enter"){
       chatResponse(usrPrompt.value);
}
})


 submitButton.addEventListener("click",()=>{
    chatResponse(usrPrompt.value); 
})

 imageInput.addEventListener("change",()=>{
    const file=imageInput.files[0]
    if(!file) return
    let reader=new FileReader
    reader.onload=(e)=>{
        let base64=e.target.result.split(",")[1]
        user.file={
                   mime_type:file.type,
                   data: base64
        }
        image.src=`data:${user.file.mime_type};base64,${user.file.data}`
        image.classList.add("selectedimage")
    }

    
      
    reader.readAsDataURL(file)
})


imageButton.addEventListener("click",()=>{
     imageButton.querySelector("input").click()
})