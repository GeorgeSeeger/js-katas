sum10=s=>(s.match(/(\d\D*?\?+.*?\d)/g)||["0?"]).every(t=>t.split("?").length==4&&t.match(/(\d)/g).reduce((a,i)=>a+(+i),0)==10)