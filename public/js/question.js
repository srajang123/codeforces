document.querySelector('.open-search').addEventListener('click', (e) => {
    document.querySelector('.form').classList.remove('formH');
    document.querySelector('.form').classList.add('formS');
})
document.querySelector('.search').addEventListener('click', (e) => {
    let title = document.querySelector('.title').value;
    let phase = document.querySelector('.sel').value;
    let list = document.querySelectorAll('.list');
    list.forEach(v => {
        if (v.children[1].innerHTML.indexOf(title) == -1 || (phase != v.children[0].innerHTML && phase != -1))
            v.style.display = 'none';
        else
            v.style.display = 'table-row';
    });
});
/*{
    let list = document.querySelectorAll('.list');
    list.forEach(v => {
        const d = new Date(Number(v.children[4].innerHTML));
        v.children[4].innerHTML = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
    });
}*/