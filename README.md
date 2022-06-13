# UDP - Orchestra

Authors: Yanick Thomann, Jean Gachet & David Gallay



## Preamble

### Firewall

Make sure your firewall is not blocking your connections. A simple (but unsafe) way to fix that is to flush your firewall

```bash
sudo iptables -F
```

Nb: The rules will be back again after a reboot. You may have another firewall manager.



### Language: Javascript

#### Deprecation notices

* `new (str: string, encoding?: BufferEncoding): Buffer;` is deprecated since v10.0.0
  We must use `Buffer.from(string[, encoding])` instead



#### Arrow functions

We will use [Arrow function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) `(...) => { ... }` instead of `function(...){...}` anonymous functions most of the time.
This is much more readable and remove the ambiguity of `this`.



### Testing

We will use `netcat` instead of telnet