var gEngine = gEngine || {};
gEngine.GameLoop = (function () {
    var kFPS = 60; // Frames per second
    var kMPF = 1000 / kFPS; // Milleseconds per frame.

    // Variables for timing gameloop.
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    // The current loop state (running or should stop)
    var mIsLoopRunning = false;

    // Reference to game logic
    var mMyGame = null;

    // This function assumes it is sub-classed from MyGame
    var _runLoop = function () {
        if (mIsLoopRunning) {
            // Step A: set up for next call to _runLoop and update input!
            requestAnimationFrame(function () { _runLoop.call(mMyGame); });
            // Step B: compute elapsed time since last RunLoop was executed
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;
            // Step C: update the game the appropriate number of times.
            // Update only every Milliseconds per frame.
            // If lag larger then update frames, update until caught up.
            while ((mLagTime >= kMPF) && (mIsLoopRunning)) {
                gEngine.Input.update();
                this.update(); // call Scene.update()
                mLagTime -= kMPF;
            }

            // Step D: now let's draw
            this.draw(); // Call MyGame.draw()
        }
    };

    var start = function (myGame) {
        mMyGame = myGame;
        // Paso A: restablecer el tiempo del marco
        mPreviousTime = Date.now();
        mLagTime = 0.0;
        // Step B: remember that loop is now running
        mIsLoopRunning = true;

        // Step C: request _runLoop to start when loading is done
        requestAnimationFrame(function () { _runLoop.call(mMyGame); });
    };

    var mPublic = {
        start: start
    };
    return mPublic;
}());