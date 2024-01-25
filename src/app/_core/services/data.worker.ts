self.addEventListener('message', (event) => {
  const data = event.data;
  self.postMessage(data);
});
