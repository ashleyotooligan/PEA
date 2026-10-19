# Open the workbench

Extract the archive and open `PEA.html`. The embedded version contains the code, all three illustrations, and all four fixture payloads. It does not fetch external data. On Windows, `Start-PEA.bat` opens the same file.

The modular `index.html` uses JavaScript modules and local JSON fetches. Serve it with Node.js 20+ using `npm start`, then visit `http://127.0.0.1:4180`. Stop with Ctrl+C. The Node server binds to loopback. Set `PEA_PORT` to change the port.

Select a view from the toolbar or click one of the fourteen navigation tabs. Select a case to update the records. Move the event cursor to open the replay view and show part of the selected fixture. The slider reveals a fraction of the supplied events; it does not invent timestamps between them.

Save view as PNG exports the Canvas. Export demo receipt downloads the selected full case, its digest, and an unsigned marker. Changing the replay cursor does not change the full payload in that export.

The screenshots are display captures of this fixture-driven design. The proposed tools and production agent are specified separately. No wallet, RPC, API key, model account, or real token address is required by the preview.
