(() => {
  const nativeFetch = window.fetch.bind(window);
  const runtimeUrl = new URL("index.wasm", document.baseURI).href;
  const partUrls = Array.from(
    { length: 7 },
    (_, index) => new URL(`wasm-parts/index.wasm.${String(index).padStart(2, "0")}.part`, document.baseURI).href,
  );

  window.fetch = async (input, init) => {
    const requestedUrl = new URL(typeof input === "string" ? input : input.url, document.baseURI).href;
    if (requestedUrl !== runtimeUrl) return nativeFetch(input, init);

    const responses = await Promise.all(partUrls.map((url) => nativeFetch(url, init)));
    const failed = responses.find((response) => !response.ok);
    if (failed) throw new Error(`Godot runtime download failed: ${failed.status}`);
    const chunks = await Promise.all(responses.map((response) => response.arrayBuffer()));
    return new Response(new Blob(chunks, { type: "application/wasm" }), {
      status: 200,
      headers: { "Content-Type": "application/wasm" },
    });
  };
})();
