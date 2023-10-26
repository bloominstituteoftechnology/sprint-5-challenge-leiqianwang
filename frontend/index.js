// const { learners, mentors } = require('./data');

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  
  
  // eslint-disable-next-line no-undef
  const learnerResponse = await axios.get('http://localhost:3003/api/learners');
  // eslint-disable-next-line no-undef
  const mentorResponse = await axios.get('http://localhost:3003/api/mentors');
     const learners = learnerResponse.data;
     const mentors = mentorResponse.data;
      const finalLearners = learners.map(learner => {
        return {
          ...learner, mentors: mentors.filter(mentor => learner.mentors.includes(mentor.id)),
        };
           
      });

      document.querySelector('.info').textContent = 'No learner is selected';
  //console.log(finalLearners);

     const cardSeciton = document.querySelector('.cards');
        for(let learner of finalLearners) {
          const learnerCard = createLearnerCard(learner);
          cardSeciton.appendChild(learnerCard);
       }
    }
  
  // Create a learner card based on data
   function createLearnerCard(learner) {
    // Create main card div.
    const learnerInfo = document.querySelector('.info');

    const div = document.createElement('div');
    div.classList.add('card');
  
    // Create learner's name.
    const learnerName = document.createElement('h3');
    learnerName.textContent = learner.fullName;
       
    const otherDiv = document.createElement('div');
    otherDiv.textContent = learner.email;
 
       
    const h4 = document.createElement('h4');
      h4.classList.add('closed');
      h4.textContent = 'Mentors';
        h4.addEventListener('click', (e) => {
          if(div.classList.contains('selected')){
            e.stopPropagation();
          }
          
             h4.classList.toggle('closed');
             h4.classList.toggle('open');
        });
        
         const ul = document.createElement('ul');
            for(let mentor of learner.mentors) {
                 const li = document.createElement('li');
                 li.textContent = `${mentor.firstName} ${mentor.lastName}`;
                 ul.appendChild(li);
            }

       
       //div.appendChild(learnerInfo);
       div.appendChild(learnerName);
      div.appendChild(otherDiv);
       div.appendChild(h4);
       div.appendChild(ul);


       div.addEventListener('click', () => {
           const cards = document.querySelectorAll('.cards');
           const isSelected = div.classList.contains('selected');
              for(let card of cards) {
                card.classList.remove('selected');
                const name = card.querySelector('h3');
                name.textContent = name.textContent.split(', ')[0];
              }
           if(!isSelected) {
                div.classList.add('selected');
                learnerInfo.textContent = `The selected learner is ${learner.fullName}`;
                learnerName.textContent = `${learner.fullName}, ID ${learner.id}`;
           }else {
               div.classList.remove('selected');
                learnerInfo.textContent = `No learner is selected`;
                learnerName.textContent = learner.fullName;

           }
           
       });
       return div;
   }
 
    

  // 👆 WORK WORK ABOVE THIS LINE 👆



// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
