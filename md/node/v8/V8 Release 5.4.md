# V8 Release 5.4

- 原文: http://v8project.blogspot.com/2016/09/v8-release-54.html
- 译文: https://github.com/magicdawn/magicdawn/blob/master/md/node/v8/V8%20Release%205.4.md


> Every six weeks, we create a new branch of V8 as part of our [release process](https://github.com/v8/v8/wiki/Release%20Process). Each version is branched from V8’s git master immediately before a Chrome Beta milestone. Today we’re pleased to announce our newest branch, [V8 version 5.4](https://chromium.googlesource.com/v8/v8.git/+log/branch-heads/5.4), which will be in beta until it is released in coordination with Chrome 54 Stable in several weeks. V8 5.4 is filled will all sorts of developer-facing goodies, so we’d like to give you a preview of some of the highlights in anticipation of the release.

每六周, 我们都会为V8创建一个新分支, 作为 [release process](https://github.com/v8/v8/wiki/Release%20Process) 的一部分. 每个版本都是在Chrome 的一个Beta milestone之前从 master 分支立即切出. 今天我们很高兴宣布我们最新的分支, [V8 5.4](https://chromium.googlesource.com/v8/v8.git/+log/branch-heads/5.4) , 在数周之后的Chrome 54稳定版发布之前, V8 5.4 将会一直是 beta 版. V8  5.4 有很多开发者喜欢的东西, 这里将展示这次发布的一些闪光点.



## Performance Improvements

>  V8 5.4 delivers a number of key improvements in memory footprint and startup speed. These primarily help accelerate initial script execution and reduce page load in Chrome.

V8 5.4 提供了许多的内存占用和启动速度关键的改进。这些主要是帮助加快启动脚本的执行，并减少Chrome页面加载。

### Memory

>  When measuring V8’s memory consumption, two metrics are very important to monitor and understand: *Peak memory* consumption and *average memory* consumption. Typically, reducing peak consumption is just as important as reducing average consumption since an executing script that exhausts available memory even for a brief moment can cause an *Out of Memory* crash, even if its average memory consumption is not very high. For optimization purposes, it’s useful to divide V8's memory into two categories: containing actual JavaScript objects and  containing the rest, such as internal data structures allocated by the compiler, parser and garbage collector. 

当测量V8的内存消耗，有两个指标对监测和了解非常重要：*峰值内存消耗* 和 *平均内存消耗*。通常情况下，减少峰值消耗同减少平均内存消耗一样重要, 因为一个将要耗尽可用的内存的执行脚本，即使是一瞬间, 会导致 *Out of Memory* crash, 即使它的平均内存占用不是很高。为了优化，将V8的内存分为两类很有用: *On-heap memory* 包含了实际的JavaScript对象以及 *off-heap memory* 包含了其余如由编译器，分析器和垃圾收集程序分配的内部数据结构。



>  In 5.4 we tuned V8’s garbage collector for low-memory devices with 512 MB RAM or less. Depending on the website displayed this reduces *peak memory* consumption of *on-heap memory* up to **40%**.

在 5.4 版本中, 我们为 512MB 或 更少的低内存设备调整了垃圾回收器. 根据网站上显示这样减少 *on-heap memory*  峰值内存消耗高达**40％**。



> Memory management inside V8’s JavaScript parser was simplified to avoid unnecessary allocations, reducing *off-heap peak memory* usage by up to **20%**. This memory savings is especially helpful in reducing memory usage of large script files, including asm.js applications.

V8的JavaScript语法分析器内的内存管理得到了简化，以避免不必要的分配，最多可减少20％ *off-heap peak memory* 的峰值内存。这对大脚本文件的内存消耗很有帮助，包括asm.js应用程序。



### Startup & speed

>  Our work to streamline V8's parser not only helped reduce memory consumption, it also improved the parser's runtime performance. This streamlining, combined with other optimizations of JavaScript builtins and how accesses of properties on JavaScript objects use global [inline caches](https://en.wikipedia.org/wiki/Inline_caching) , resulted in notable startup performance gains. 

我们的工作简化V8的解析器不仅有助于减少内存消耗，也提高了解析器的运行时性能。这种精简，结合JavaScript的内部优化以及使用全局 [inline caches](https://en.wikipedia.org/wiki/Inline_caching) 访问JavaScript对象的属性, 带来了显著的启动性能提升。



>  Our [internal startup test suite](https://youtu.be/xCx4uC7mn6Y) that measures real-world JavaScript performance improved by a median of 5%. The [Speedometer](http://browserbench.org/Speedometer/) benchmark also benefits from these optimizations, improving by [~ 10 to 13% compared to 5.2](https://chromeperf.appspot.com/report?sid=f5414b72e864ffaa4fd4291fa74bf3fd7708118ba534187d36113d8af5772c86&start_rev=393766&end_rev=416239).

我们用于测量真实世界JavaScript性能的 [内部启动测试套件](https://youtu.be/xCx4uC7mn6Y) 有了5％的中值的提高。[Speedometer](http://browserbench.org/Speedometer/) 性能测试也从这些优化中受益，[由 5.2 提高了约 10 至 13％](https://chromeperf.appspot.com/report?sid=f5414b72e864ffaa4fd4291fa74bf3fd7708118ba534187d36113d8af5772c86&start_rev=393766&end_rev=416239) 。



![](https://3.bp.blogspot.com/-pmhqweTXsgA/V9KofTl0iEI/AAAAAAAABfc/H35jkvaMsgkLriGq627hca3rf6TZqKwKACLcB/s1600/speedometer5.4.png)



## V8 API

>  Please check out our [summary of API changes](http://bit.ly/v8-api-changes) . This document is regularly updated a few weeks after each major release.
>
> 
>
>  Developers with an [active V8 checkout](https://github.com/v8/v8/wiki/Using%20Git) can use 'git checkout -b 5.4 -t branch-heads/5.4' to experiment with the new features in V8 5.4. Alternatively you can [subscribe to Chrome's Beta channel](https://www.google.com/chrome/browser/beta.html) and try the new features out yourself soon.
>
> 
>
> Posted by the V8 team

