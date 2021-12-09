import React, { useEffect } from 'react';
import './App.css';
// import SmartLightControls from './components/SmartLightControls';

function App() {
  const [sketches, setSketches] = React.useState<Record<string, string[]> | undefined>();
  useEffect(() => {
    const name = window.location.pathname.substr(1);
    if (name) {
      const SketchClass = require(`./sketches/${name}`).default;
      if (SketchClass) {
        new SketchClass().create();
      }
    } else {
      const sketchModules = require.context('./sketches/', true, /\.sketch.ts$/).keys();
      //@ts-ignore
      const groupedModules = sketchModules.reduce<Record<string, string[]>>((prev, curr) => {
        const lastIndex = curr.lastIndexOf('/');
        const key = curr.substr(2, lastIndex - 2);
        if (!prev[key]) {
          prev[key] = [];
        }

        prev[key].push(curr.substr(lastIndex + 1).replace('.sketch.ts', ''));

        return prev;
      }, {});
      setSketches(groupedModules);
    }
  }, []);

  return (
    <div id="container">
      {sketches && (
        <>
          {/* <SmartLightControls /> */}
          <div id="sketches">
            {Object.keys(sketches).map((title) => (
              <div key={title}>
                <h1>{title}</h1>
                <ul>
                  {sketches[title].map((s) => (
                    <li key={s}>
                      <a href={`./${title}/${s}.sketch.ts`}>{s}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
