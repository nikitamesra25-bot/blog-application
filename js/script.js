console.log("BlogSpace application is running!");


const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (email.trim() === "" || password.length < 6) {
      message.textContent = "Please enter valid details.";
      message.style.color = "red";
      return;
    }

    message.textContent = "Login successful!";
    message.style.color = "green";

    setTimeout(function () {
    window.location.href = "dashboard.html";
}, 1000);
  });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const message = document.getElementById("registerMessage");

    if (name === "" || email === "" || password.length < 6) {
      message.textContent = "Please enter valid details.";
      message.style.color = "red";
      return;
    }

    message.textContent =
      "Registration form validated successfully!";
    message.style.color = "green";
    setTimeout(function () {
    window.location.href = "login.html";
}, 1000);
  });
}

const dashboardBlogs = document.getElementById("dashboardBlogs");

if (dashboardBlogs) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  function renderDashboardBlogs() {
    const currentBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    dashboardBlogs.innerHTML = "";

    if (currentBlogs.length === 0) {
      dashboardBlogs.innerHTML =
        "<p>No blogs yet. Click Create Blog to publish your first blog!</p>";
      return;
    }

    currentBlogs.forEach(function (blog, index) {
      const card = document.createElement("article");
      card.className = "blog-card";

      const title = document.createElement("h3");
      title.textContent = blog.title;

      const content = document.createElement("p");
      content.textContent = blog.content;

      const date = document.createElement("p");
      date.className = "blog-date";
      date.textContent = "Published: " + blog.date;

      card.appendChild(title);

      if (blog.image) {
        const image = document.createElement("img");
        image.src = blog.image;
        image.alt = blog.title;
        image.className = "blog-image";
        image.onerror = function () {
          image.style.display = "none";
        };
        card.appendChild(image);
      }

      card.appendChild(content);
      card.appendChild(date);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete Blog";
      deleteButton.className = "delete-btn";

      deleteButton.addEventListener("click", function () {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");

        if (confirmDelete) {
          const updatedBlogs =
            JSON.parse(localStorage.getItem("blogs")) || [];

          updatedBlogs.splice(index, 1);
          localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

          renderDashboardBlogs();
        }
      });

      card.appendChild(deleteButton);
      dashboardBlogs.appendChild(card);
    });
  }

  renderDashboardBlogs();
}

const createBlogForm = document.getElementById("createBlogForm");

if (createBlogForm) {
  createBlogForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("blogTitle").value.trim();
    const image = document.getElementById("blogImage").value.trim();
    const content = document.getElementById("blogContent").value.trim();
    const message = document.getElementById("blogMessage");

    if (title === "" || content === "") {
      message.textContent = "Please enter the title and content.";
      message.style.color = "red";
      return;
    }

    const blog = {
      title: title,
      image: image,
      content: content,
      date: new Date().toLocaleDateString()
    };

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push(blog);

    localStorage.setItem("blogs", JSON.stringify(blogs));

    message.textContent = "Blog published successfully!";
    message.style.color = "green";

    createBlogForm.reset();
  });
}

const homeBlogs = document.getElementById("homeBlogs");

if (homeBlogs) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  homeBlogs.innerHTML = "";

  if (blogs.length === 0) {
    homeBlogs.innerHTML = "<p>No published blogs yet.</p>";
  } else {
    blogs.forEach(function (blog) {
      const card = document.createElement("article");
      card.className = "blog-card";

      const title = document.createElement("h3");
      title.textContent = blog.title;

      const content = document.createElement("p");
      content.textContent = blog.content;

      card.appendChild(title);

      if (blog.image) {
        const image = document.createElement("img");
        image.src = blog.image;
        image.alt = blog.title;
        image.className = "blog-image";

        image.onerror = function () {
          image.style.display = "none";
        };

        card.appendChild(image);
      }

      card.appendChild(content);
      homeBlogs.appendChild(card);
    });
  }
}