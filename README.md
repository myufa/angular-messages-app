# Angular Message App
Made for pearl.io

View the deployed app at https://myufa.github.io/angular-messages-app/

### `Key Lessons`
- Angular member variables act like React state variables
- *ngIf will conflict with onInit scripts and mat table sort, paginate, filter while [hidden] will take advantage of hidden html element and allow onInit scripts to load changes from data received by async api call
- Casting api json data as anyType can prevent typeScript union errors when loading data into interfaces

### `Design Choices`
- Filtered out data with no valid firstName or lastName in seeker service
- Removed channel and status members of Message interface to match the data provided in the seeker api
- Sorted messages in the fetching and processing stage to easily select the latest message in the table
