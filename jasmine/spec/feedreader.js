
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

        // Passing done as an argument before each function will make Jasmine
        // to pass to be invoked when the asychronous work has been completed
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed called and completed its work', function() {
            expect(document.querySelector('.feed .entry').childElementCount).toBeGreaterThan(0);
        });
    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function(){

        // initializing oldEntry and newEntry variables for the expectation comparison
        let oldEntry;
        let newEntry;

        // Checking if the h2 from the first entry is different from the second one
        beforeEach(function(done){

            let loadedCount = 0;

            // if function loaded has been called 2 times then I should call done()
            function loaded() {
                loadedCount++;
                if (loadedCount==2) done();
            }
    
            loadFeed(0, function(){
                oldEntry = document.querySelector('.entry').getElementsByTagName('h2')[0].innerHTML;
                // console.log('oldEntry', oldEntry);
                loaded();
            });
    
            loadFeed(1, function(){
                newEntry = document.querySelector('.entry').getElementsByTagName('h2')[0].innerHTML;
                // console.log('newEntry', newEntry);
                loaded();
            });
    
        });

        // Checking if the newEntry is different from the old/first one
        it('The content of the new feed is changed', function(){
            expect(newEntry).not.toEqual(oldEntry);
        })
    });

}());
