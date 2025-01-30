module.exports = async (page, scenario, vp) => {
    console.log('SCENARIO > ' + scenario.label);

    // add more ready handlers here...
    await page.waitForFunction(() => {
      return document.fonts.ready.then(() => {
        console.log('Fonts loaded');
        return true;
      });
    });

    await page.evaluate((scenario) => {
      /** force load lazy images */
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach((i) => {
        i.removeAttribute('loading');
      });
    }, scenario);

    // await require('./clickAndHoverHelper')(page, scenario);

    if (scenario.showSelectors) {
      await Promise.all(
        scenario.showSelectors.map(async (selector) => {
          await page
            .evaluate((sel) => {
              document.querySelectorAll(sel).forEach(s => {
                s.style.visibility = 'visible';
              });
            }, selector);
        })
      );
    }

    await page.waitForTimeout(scenario.delay || 0);
  };
