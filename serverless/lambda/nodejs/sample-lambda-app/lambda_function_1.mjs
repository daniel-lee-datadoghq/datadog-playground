console.log('Loading function');

export const handler = async (event, context) => {
   
     const operation = event.operation;
   
     if (operation == 'echo'){
          console.log('echo');
          console.log(event);
          return(event.payload);
     }
     
    else { 
          console.log('other');
          console.log(event);
          return(event.payload);
    }
};
