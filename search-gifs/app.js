window.onload = function () {
    const input = document.getElementsByClassName('search-input');
    const list = document.getElementsByClassName('gifs-list')[0];

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

    const searchGiphy = (term) => {
        const giphyUrl = `http://api.giphy.com/v1/gifs/search?q=${ term }&api_key=dc6zaTOxFJmzC`;
        return fetch(giphyUrl);
    };

    const gifs = distinct
        .flatMapLatest(searchGiphy);

    gifs.subscribe(
        data => {
            data.json().then(a => console.log(a))
                // .appendChild(data => data.map(value => document.createElement('li').value = data));
        }, error => {
            console.log(error);
        }
    )
}