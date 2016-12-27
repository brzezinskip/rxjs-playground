const input = document.getElementsByClassName('search-input');


// observable listening to the keup event
const keyups = Rx.Observable.fromEvent(input, 'keyup')
    .pluck('target', 'value')
    .filter(text => text.length > 2);

// debounce input for 500ms
const debounced = keyups
    .debounce(500);

// get only distinct values to eliminate control characters
const distinct = debounced
    .distinctUntilChanged();


// querying giphy.com

