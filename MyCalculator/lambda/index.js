'use strict';
//Najeeb Hussaini
//import ask-sdk-core
const Alexa = require('ask-sdk-core');

//skill name
const appName = 'My Calculator';

//code for the handlers
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //welcome message
        let speechText = 'Welcome to My Calculator. You can say, Add 2 and 5, or Multiply 4 and 8';
        //welcome screen message
        let displayText = "Welcome to My Calculator" //Echo devices that have display(text will show up on screen for skill)
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse(); //sent back to alexa for it to be processed 
    }
};

//implement custom handlers
const AddIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AddIntent';
    },
    handle(handlerInput) {
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value; // text version of slot
        let secondNumber = intent.slots.secondNumber.value;
        //check if slots are null or not
        if (firstNumber && secondNumber) {
            //perform operation 
            let result = parseInt(firstNumber) + parseInt(secondNumber);
            speechText = `The result of ${firstNumber} plus ${secondNumber} is ${result}`;
            displayText = `${result}`;

            return handlerInput.responseBuilder.speak(speechText).withSimpleCard(appName , displayText).withShouldEndSession(true).getResponse();
        } else {
            //no value provided
            //ask for required input that you made in alexa integration model 
            return handlerInput.responseBuilder
            .addDelegateDirective(intent)
            .getResponse();
        }
    }
}
const MultiplyIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'MultiplyIntent';
    },
    handle(handlerInput) {
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value; // text version of slot
        let secondNumber = intent.slots.secondNumber.value;
        //check if slots are null or not
        if (firstNumber && secondNumber) {
            //perform operation 
            let result = parseInt(secondNumber) * parseInt(firstNumber);
            speechText = `The result of ${firstNumber} multiplied by ${secondNumber} is ${result}`;
            displayText = `${result}`;

            return handlerInput.responseBuilder.speak(speechText).withSimpleCard(appName , displayText).withShouldEndSession(true).getResponse();
        } else {
            //no value provided
            //ask for required input that you made in alexa integration model 
            return handlerInput.responseBuilder
            .addDelegateDirective(intent)
            .getResponse();
        }
    }
}

const SubtractIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'SubtractIntent';
    },
    handle(handlerInput) {
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value; // text version of slot
        let secondNumber = intent.slots.secondNumber.value;
        //check if slots are null or not
        if (firstNumber && secondNumber) {
            //perform operation 
            let result = parseInt(secondNumber) - parseInt(firstNumber);
            speechText = `The result of ${secondNumber} minus ${firstNumber} is ${result}`;
            displayText = `${result}`;

            return handlerInput.responseBuilder.speak(speechText).withSimpleCard(appName , displayText).withShouldEndSession(true).getResponse();
        } else {
            //no value provided
            //ask for required input that you made in alexa integration model 
            return handlerInput.responseBuilder
            .addDelegateDirective(intent)
            .getResponse();
        }
    }
}

const DivideIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DivideIntent';
    },
    handle(handlerInput) {
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value; // text version of slot
        let secondNumber = intent.slots.secondNumber.value;
        //check if slots are null or not
        if (firstNumber && secondNumber) {
            //perform operation 
            let result = parseInt(firstNumber) / parseInt(secondNumber);
            result = +result.toFixed(2); //to make the result two decimal places 
            speechText = `The result of ${firstNumber} divided by ${secondNumber} is ${result}`;
            displayText = `${result}`;

            return handlerInput.responseBuilder.speak(speechText).withSimpleCard(appName , displayText).withShouldEndSession(true).getResponse();
        } else {
            //no value provided
            //ask for required input that you made in alexa integration model 
            return handlerInput.responseBuilder
            .addDelegateDirective(intent)
            .getResponse();
        }
    }
}

//end Custom handlers

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //help text for your skill
        let speechText = 'You can say add 3 and 5 or divide 50 by 2';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = 'Goodbye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

//Lambda handler function
//Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         HelpIntentHandler,
                         AddIntentHandler,
                         SubtractIntentHandler,
                         MultiplyIntentHandler,
                         DivideIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler).lambda();
