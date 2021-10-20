// console.log('我是main.js')


//请求CSS
getCSS.onclick = () => {
        const request = new XMLHttpRequest()
        request.open('GET', '/style.css')
        request.onreadystatechange = () => {
            console.log(request.readyState)
            if (request.readyState === 4) { //下载完成，但是不知道是成功2xx还是失败4xx 5xx
                console.log('下载完成')
                if (request.status >= 200 && request.status < 300) { //如果状态码是成功的（路径正确或者路由正确）
                    //创建style标签
                    const style = document.createElement('style')
                        //填写style内容
                    style.innerHTML = request.response
                        // 插入到网页head里面
                    document.head.appendChild(style)
                } else { //失败了提示
                    alert('加载CSS失败')
                }

            }
        };

        request.send()
    }
    //请求JS
getJS.onclick = () => {
        const request = new XMLHttpRequest()
        request.open('GET', '/2.js')
        request.onload = () => {
            console.log(request.response)
                //创建script标签
            const script = document.createElement('script')
                // 填写script内容
            script.innerHTML = request.response
                //插入script标签
            document.body.appendChild(script)
        }
        request.onerror = () => {}
        request.send()
    }
    //请求HTML
getHTML.onclick = () => {
        const request = new XMLHttpRequest()
        request.open('GET', '/3.html')
        request.onload = () => {
            console.log(request.response)
            const div = document.createElement('div')
            div.innerHTML = request.response
            document.body.appendChild(div)
        }
        request.onerror = () => {}
        request.send()
    }
    //请求XML
getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/4.xml')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status == 200) {
            const dom = (request.responseXML);
            const text = dom.getElementsByTagName('warning')[0].textContent
            console.log(text.trim())
        }
    }
    request.send()
};
//请求JSON
getJSON.onclick = () => {
        const request = new XMLHttpRequest()
        request.open('GET', '/5.json')
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                const object = JSON.parse(request.response) //将符合jason语法的字符串转化成对象或其他js对应的数据类型
                console.log(object)
                myName.textContent = object.name //页面的id为myName的标签文本内容为对象里面name的value
            }
        }
        request.send()
    }
    //分页操作
let n = 1;
getPage.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `/page${n+1}`);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const array = JSON.parse(request.response) //得到的字符串变成数组
            array.forEach(item => { //m每一项 创建li标签
                const li = document.createElement("li")
                li.textContent = item.id //li里面的内容是id对应的值
                xxx.appendChild(li) //ul里面插入li标签
            });
            n = n + 1;
        }
    };
    request.send();
};