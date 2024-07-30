npm install js-cookie
npm install awesome-react-stepper
npm install jquery
npm i react-slick
npm install slick-carousel
npm install datatables.net-bs4

http://localhost:3004/team-expert-it-lab5-yKUULi/detail/1
  onSubmit: async (values) => {
      try {
        const response = await fetch(`${API_PATH}/auth-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          mode:'no-cors'
        });

        if (response.ok) {

          const data = await response.json();
          console.log("Réponse du serveur :", data);
         
        } else {

          const errorData = await response.json();
          setError("Erreur lors de la requête : " + errorData.message);
        }
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    },
    
    
    login.js:29     POST http://127.0.0.1:8000/api/auth-login 419 (unknown status)
onSubmit @ login.js:29
eval @ formik.esm.js:956
eval @ formik.esm.js:1266
eval @ formik.esm.js:872
Promise.then (async)
eval @ formik.esm.js:848
eval @ formik.esm.js:1266
eval @ formik.esm.js:936
eval @ formik.esm.js:1266
callCallback @ react-dom.development.js:4164
invokeGuardedCallbackDev @ react-dom.development.js:4213
invokeGuardedCallback @ react-dom.development.js:4277
invokeGuardedCallbackAndCatchFirstError @ react-dom.development.js:4291
executeDispatch @ react-dom.development.js:9041
processDispatchQueueItemsInOrder @ react-dom.development.js:9073
processDispatchQueue @ react-dom.development.js:9086
dispatchEventsForPlugins @ react-dom.development.js:9097
eval @ react-dom.development.js:9288
batchedUpdates$1 @ react-dom.development.js:26140
batchedUpdates @ react-dom.development.js:3991
dispatchEventForPluginEventSystem @ react-dom.development.js:9287
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ react-dom.development.js:6465
dispatchEvent @ react-dom.development.js:6457
dispatchDiscreteEvent @ react-dom.development.js:6430
client.js:1 Erreur lors de la requête : SyntaxError: Unexpected end of input (at login.js:45:44)
    at onSubmit (login.js:45:44)
