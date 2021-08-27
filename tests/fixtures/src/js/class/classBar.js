import * as styles from '../../css/classBar.module.css'

export class Bar {
    log = (string) => {
        document.body.innerHTML += `<div class="${styles.bar}">text: ${string}</div>`;
    }
}
