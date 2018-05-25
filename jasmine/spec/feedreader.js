
$(function() {
   
    describe('RSS Feeds', function() {

        // initialiazing a variable to null in order to,
        // use it further down for comparisons
        let empty = ''
        
        // Checking if allFeeds is defined and not null
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Checking if each and every feed has a non-empty URL
        it('Every feed has a non empty url value', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).not.toEqual(empty);
            });
        });

        // Checking if each of the feeds has a non-empty name
        it('Every feed has a non empty name value', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).not.toEqual(empty);                
            });
        });

    });


    // Menu test suite
    describe('The menu', function() {

        let body = document.body;
        let menuIcon = document.querySelector(".menu-icon-link");
        let hiddenMenu = body.classList.contains("menu-hidden");
       
        // if menu is hidden by default the body classList,
        // should contain the menu-hidden class
        it('Menu element hidden by default', function() {
            expect(hiddenMenu).toBe(true);
        });


        // checking if the body does not contains the menu-hidden class,
        //  when the menu icon is clicked
        it('Does the menu display when clicked', function(){
            menuIcon.click();
            expect(body.classList.contains("menu-hidden")).not.toBe(true);
        });
        // When the menu icon is clicked again, body classList should
        // should contain the menu-hidden class
        it('Does it hide when clicked again', function(){
            menuIcon.click();
            expect(body.classList.contains("menu-hidden")).toBe(true);
        });
        
    });

    // Initial Entries test suite
    describe('Initial Entries', function(){

        // Getting the feed element from the DOM
        const feedElement = document.querySelector('.feed');

        // Passing done as an argument before each function will make Jasmine
        // to pass to be invoked when the asychronous work has been completed
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed called and completed its work', function() {
            expect(feedElement.childElementCount).toBeGreaterThan(0);
        });
    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function(){
        let oldEntry;
        let newEntry;
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done){

            loadFeed(0, function(){
                oldEntry = document.querySelector('.entry').getElementsByTagName('h2')[0].innerHTML;
            });

            loadFeed(1, function(){
                newEntry = document.querySelector('.entry').getElementsByTagName('h2')[0].innerHTML;
                done();
            });
            
        });

        it('The content of the new feed is changed', function(){
            expect(newEntry).not.toEqual(oldEntry);
        })
    });
    
}());
