var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");

var sites = [];
if (localStorage.getItem("sites") != null) {
  sites = JSON.parse(localStorage.getItem("sites"));
  displayRow();
}

function addSite() {
  if (validateSite(siteNameInput) && validateSite(siteUrlInput)) {
    var site = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    sites.push(site);
    console.log(sites[0].name);
    localStorage.setItem("sites", JSON.stringify(sites));
    clearForm();
    displayRow();
  } else {
    Swal.fire({
      html: `
        <div class="w-100 h-100 d-flex justify-content-center align-items-center">
          <div class="bg-white rounded-2 p-3 box-content">
            <header class="d-flex justify-content-between mb-4 mt-3 ms-2">
              <div>
                <i class="fa-solid fa-circle text-danger"></i>
                <i class="fa-solid fa-circle text-warning"></i>
                <i class="fa-solid fa-circle text-success"></i>
              </div>
              <button type="button" class="border-0 bg-white close-btn" aria-label="close icon">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </header>

            <p class="invalid-message text-black mb-4 ms-2">Site Name or Url is not valid, Please follow the rules below :</p>
            <p class="invalid-point text-black ms-4"><i class="fa-regular fa-circle-right text-danger"></i> Site name must contain
              at least 3 characters
            </p>
            <p class="invalid-point text-black ms-4"><i class="fa-regular fa-circle-right text-danger"></i> Site URL must be a valid one</p>
          </div>
        </div>
      `,
      showConfirmButton: false,
      width: "1000px",
      background: "transparent",
      backdrop: "rgba(0,0,0,0.4)",
      allowOutsideClick: false,
      customClass: {
        htmlContainer: "text-start", 
      },
    });

    // ✅ Add close functionality for the ❌ icon
    setTimeout(() => {
      const closeBtn = document.querySelector(".close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => Swal.close());
      }
    }, 100);
  }
}

function displayRow() {
  var cartona = "";
  for (var i = 0; i < sites.length; i++) {
    cartona += ` <tr>
                <th scope="row">${i + 1}</th>
                <td>${sites[i].name}</td>
                <td><a target=_blank href="${
                  sites[i].url
                }"><button type="button" class="btn btn-visit pe-2 "><i class="fa-solid fa-eye"></i> Visit </button></a></td>
                <td><button type="button" onclick="deleteRow(${i})" class="btn btn-delete pe-2 "><i class="fa-solid fa-trash"></i> Delete </button></td>
                </tr>`;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function clearForm() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function deleteRow(index) {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displayRow();
}

function validateSite(element) {
  var regex = {
    siteName: /^[A-Za-z]{3,}$/,
    siteUrl:
      /^((https?:\/\/)|(www\.))?([a-zA-Z0-9-]+\.)+com(\/[\w\-\.~:%#?&=+]*)*$/,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}
