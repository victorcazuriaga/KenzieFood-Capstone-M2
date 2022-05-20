export class Utility {
  //Alerta popup---------------------

  static showAlert(text = 'error') {
    const alertContainer = document.getElementById('alert');
    const alertText = document.getElementById('text-alert');
    const closeAlert = document.getElementById('close-alert');

    alertText.innerText = text;
    alertContainer.classList.remove('display-none');
    closeAlert.addEventListener('click', event => {
      event.preventDefault();
      alertContainer.classList.add('display-none');
    });
  }
}
