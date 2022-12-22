# React Luma

React Luma is a React renderer for building user interfaces on a WebGL canvas. Perfect for TV.

## Documentation

You can find the React Luma documentation [on the website](https://matvp91.github.io/react-luma/).

## The Problem

Building an effective and performant UI on devices like smart tv's or set-top boxes is a real challenge. They mostly have a lot less memory and limited graphics acceleration. In order to be able to run an app, these devices come with a pre-installed browser, often forked from popular JS engines like JavascriptCore or Chromium. Updating to the latest stable version doesn't happen routinely (if at all), Connected TV developers find themselves working with all sorts of browser variations.

There isn't a whole lot we can gather about memory or performance when working with the DOM, and while it "just works", scaling and repaints are relatively slow compared to alternatives. Bottom line, using the DOM on these lower end devices can quickly become cumbersome.

One of these alternatives is WebGL, a web standard JavaScript API for rendering interactive 2D (oh, and 3D) graphics.

React Luma combines the declarative model of React with WebGL rendering. There's plenty of subtle performance tricks under the hood to ensure performance is key. Memory consumption is also considerably less due to the significant reduction in DOM nodes as the browser merely paints to the canvas element.
