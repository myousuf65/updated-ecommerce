import React,{useRef} from 'react';
import emailjs from '@emailjs/browser';
import "../styles/contact-form.css"
import Faq from "react-faq-component";

function ContactUs(props) {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        if(form.current.email.value.length === 0 || form.current.subject.value === 0 || form.current.message.value === 0 || form.current.name === 0){
            document.getElementById("boo").innerHTML = ""
            var div  = document.createElement('div');
            div.id = "unsubmitted"
            div.innerText = "You have left some details. Please complete your request."
            document.getElementById("boo").appendChild(div); 
            return
        }

        console.log(form.current.email.value)
        emailjs.sendForm('service_nrxtgbc', 'template_z84dbwl', form.current, '2DF4kmSYwGFdx0230')
          .then((result) => {
              console.log(result.text);
              document.getElementById("boo").innerHTML = ""
              var div  = document.createElement('div');
              div.id = "submitting"
              div.innerText = "Sucessfully delivered your request. Thank You for contacting us."
              document.getElementById("boo").appendChild(div);
  
          }, (error) => {
              console.log(error.text);
          });
  
          e.target.reset();
  
      };


    const data = {
        title: "FAQ( Frequently Asked Questions)",
        rows: [
            {
                title: "1. Why sell on E-Commerce Store?",
                content: `E-commerce is the global platform for people to sell and buy products easily, we are present in maximum number of countries and regions. We provide efficient service to both sellers and buyers`,
            },
            {
                title: "2. What requirements are necessary to register as a seller?",
                content:
                    "No requirement is needed to register as a seller",
            },
            {
                title: "3.	I have not received goods, what can I do?",
                content: `You can either reach out to the seller or you can fill 
                The form below and our team will assist you ASAP.
                `,
            },
            {
                title: "4.	How to update or delete the product ?",
                content: "You may click on the update button on the products page and modify the details or you can remove products by pressing delete button.",
            },
            {
                title: "5.	Do I have to pay for shipping?",
                content: "It depends on the region and the size of the goods that you are buying.",
            },
            {
                title: "6.  Get in touch",
                content: "You can reach out to the team by filling out your request in the Contact Form below or email us on dummy@email.com",
            },
        ],
    };
    
    const styles = {
        // bgColor: 'white',
        titleTextColor: "black",
        rowTitleColor: "black",
        rowContentColor: 'grey',
        arrowColor: "red",
    };
    
    const config = {
        animate: true,
        arrowIcon: "V",
        tabFocus: true
    };

    return (
        <div>

            <div className='faq' id={'FAQ'}>
                <Faq
                    data={data}
                    styles={styles}
                    config={config}
                />

                <div className='faq--buttons'>
                    <button className='button'><a /*</button>href={}*/ download >Download Privacy Policy</a></button>
                    <button className='button'><a /*href={terms}*/ download >Download Terms and Conditions</a></button>
  
                </div>


            </div>

            <section className="section">
                <h1 style={{textAlign:"center", margin: "20px", fontSize: "35px"}}>Contact Us</h1>
                <form ref={form} onSubmit={sendEmail}>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input style={{borderRadius :"8px"}} type="text" class="form-control1" name="user_name" id="name" placeholder="Stephen Peterson"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                
                                <input style={{borderRadius :"8px"}} type="email" class="form-control1" name="user_email" id="email" placeholder="peterson@hotmail.com"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <input style={{borderRadius :"8px"}} type="text" class="form-control1" name="subject" id="subject" placeholder="Complaint about item #54GHT5434"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <textarea style={{borderRadius :"8px"}} name="message" class="form-control" id="message" cols="30" rows="4" placeholder="Leave your message here"></textarea>
                            </div>
                        </div>
                    
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="submit" value="Send Message" class="btn btn-primary"/>
                            </div>

                            <div id='boo'>
                            </div>
                        </div>
                    </div>
                </form>
		    </section>
        </div>
    );
}

export default ContactUs;