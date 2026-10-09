// Test preparation only: the original cold installer queues unread bodies.
// Drain transport while preparing an already-installed legacy controller.
const preparationFetch=self.fetch.bind(self);
self.fetch=async(...args)=>{const response=await preparationFetch(...args);const bytes=await response.arrayBuffer();return new Response(bytes,{status:response.status,statusText:response.statusText,headers:response.headers})};
importScripts("/tests/fixtures/r14724-service-worker.js");
