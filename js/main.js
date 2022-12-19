
(() =>{
    /**
     * Can be considered as the view in the MVC pattern
     */
    const form = document.querySelector('#form');
    const btns = document.querySelectorAll('.form-btn');
    const modal = document.querySelector("#myModal");
    const modal_text = document.querySelector("#modal-message");
    const closebtn = document.querySelector("#close");


    class Subscribe{
        //subscribe details (private)
        #name;
        #email;
        #registered;
    
        constructor(name, email, registered){
            this.#name = name;
            this.#email = email;
            this.#registered = registered;
            this.#init();
            form.elements['name'].value = name;
            form.elements['email'].value = email;
        }
    
        /**
         * Can be considered as the controller , binding the view with the model
         */
        #init = () =>{
            //binding the form to class
            form.addEventListener('submit', function(event){
                event.preventDefault();
                this.#registerData();
            }.bind(this));
            
           // binding the buttons to the class
           [...btns].forEach(btn =>{
                btn.addEventListener('click', function(event){
                    this.#btnInfo(event.target.id);
                }.bind(this));
           });

            // When the user clicks on <span> (x), close the modal
            closebtn.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
    
        }
    
        /**
         * Display the modal
         * @param {*} message string to be displayed
         */
        #displayModal = (message) =>{
            modal_text.innerText = message;
            modal.style.display = "flex";
        }
    
        /**
         * Save to local storage all the fields
         */
        #savetoLocalStorage = () =>{
            let message = '';
            let name = form.elements["name"].value;
            let email = form.elements["email"].value;
            if(name && email){
                localStorage.setItem('data', JSON.stringify({name, email}));
                message = `Successfully saved data \n Name: ${name} \n Email: ${email} \n Button clicked: Save`;
                this.#displayModal(message);
            }
            else{
                message = 'Please fill the fields before saving \n Button clicked: Save';
                this.#displayModal(message);
            }
        }
    
    
        /**
         * based on click of button display appropriate message
         * @param {} btn_id button event id
         */
        #btnInfo = (btn_id) =>{
            let message = '';
            switch(btn_id){
                case "show-details": {
                    this.#formValidation() 
                        ? message = `The details are as follows: \n Name: ${this.#name} \n Email: ${this.#email} \n Button clicked: Show Details`
                        : message = 'Please subscribe in order to access the information. \n Button clicked: Show Details';
                    this.#displayModal(message);
                    break;
                }
    
                case "already-registered": {
                    this.#registered 
                        ? message = `You have successfully registered! \n Registered: ${this.#registered} \n Button clicked: Already Registered` 
                        : message = `You have not registered yet.\n Registered: ${this.#registered} \n Button clicked: Already Registered`;
                    this.#displayModal(message);
                    break;
                    }
                case "save": 
                    this.#savetoLocalStorage();
                    break;
                case "finish": {
                    if(this.#formValidation()){
                        this.#savetoLocalStorage();
                        message = `The form submission is successful! \n Name: ${this.#name} \n Email: ${this.#email} \n Button clicked: Finish`;
                    }
                    else{
                        message = 'Please register before quitting the form \n Button clicked: Finish';
                    }
                    this.#displayModal(message);
                    break;
                }
                    
                default: console.log("error");
    
            }
        }
    
        /**
         * On click of subcribe to the mail list
         */
        #registerData = () =>{
            this.#name = form.elements['name'].value;
            this.#email = form.elements['email'].value;
            this.#registered = true;
            this.#displayModal(`You have successfully filled the form!\n Name: ${this.#name} \n Email: ${this.#email} \n Form clicked: Subscribe`);
        }
        
        /**
         * simple form validation
         * @returns return true if form validation
         */
        #formValidation = () =>{
            return this.#name && this.#email && this.#registered;
        }
    
    }

    //load data from local storage and create the constructor for class
    let data  = localStorage.getItem('data');
    let parsedData = data ? JSON.parse(data): {}; 
    new Subscribe(parsedData["name"] ?? '', parsedData["email"] ?? '', !!(parsedData.name && parsedData.email));

})();