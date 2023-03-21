import tracer from 'dd-trace';

tracer.init({
  hostname: 'dd-agent',
  port: 8126,
  logInjection: true,
});
export default tracer;
