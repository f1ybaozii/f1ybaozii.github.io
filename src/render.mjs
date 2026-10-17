import { Liquid } from "liquidjs";
import { fileURLToPath } from "node:url";

const engine = new Liquid({
  root: fileURLToPath(new URL("theme/acadhomepage/", import.meta.url)),
  extname: ".html", strictFilters: true,
});
const publicationStatusOrder = { accepted: 0, "under-review": 1 };
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);
const paths = {
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  github: '<path d="M9 19c-4.3 1.3-4.3-2.5-6-3m12 6v-3.4c0-1 .1-1.4-.5-2 3.3-.4 6.5-1.6 6.5-7A5.4 5.4 0 0 0 19.5 6a5 5 0 0 0-.1-3.6S18.2 2 15.7 3.7a13.7 13.7 0 0 0-7.4 0C5.8 2 4.6 2.4 4.6 2.4A5 5 0 0 0 4.5 6 5.4 5.4 0 0 0 3 9.7c0 5.4 3.2 6.6 6.5 7-.5.5-.6 1-.5 2V22"/>',
  print: '<path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2"/><path d="M6 14h12v7H6zM17 12h.01"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
};
const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
const link = (url, content, className = "") => `<a class="${className}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${content}</a>`;
const repositoryLink = (url) => link(url, `${icon("github")} ${escape(url.replace("https://", ""))}`, "repository-link");
const tags = (items) => items.length ? `<ul class="topic-tags">${items.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>` : "";
const details = (label, content) => content ? `<details class="entry-details"><summary>${icon("chevron")}${escape(label)}</summary><div class="details-body">${content}</div></details>` : "";
const section = (id, title, emoji, content, first = false) => `<section class="homepage-section" id="${id}" aria-labelledby="${id}-title"><${first ? "h1" : "h2"} id="${id}-title"><span aria-hidden="true">${emoji}</span> ${escape(title)}</${first ? "h1" : "h2"}>${content}</section>`;
const translations = {
  en: {
    home: "Homepage", about: "About Me", education: "Educations", honors: "Honors and Awards",
    publications: "Publications", projects: "Open-source Projects", skills: "Skills", languages: "Languages",
    publicationGroups: { accepted: "Accepted", "under-review": "Under Review" },
    details: "Research details", projectDetails: "Project details", print: "Print",
    viewFigure: "Click to enlarge", closeFigure: "Close figure", figureDialog: "Paper figure",
    navigation: "Main navigation", menu: "Toggle navigation", language: "Language",
    email: "Email", skip: "Skip to content", top: "Back to top", source: "Source",
  },
  zh: {
    home: "个人主页", about: "个人简介", education: "教育经历", honors: "获奖荣誉",
    publications: "论文经历", projects: "开源项目", skills: "技术技能", languages: "语言能力",
    publicationGroups: { accepted: "Accepted · 已录取", "under-review": "Under Review · 在投" },
    details: "研究详情", projectDetails: "项目详情", print: "打印",
    viewFigure: "点击放大配图", closeFigure: "关闭配图", figureDialog: "论文配图",
    navigation: "主要导航", menu: "展开或收起导航", language: "语言",
    email: "邮箱", skip: "跳转到正文", top: "返回顶部", source: "源码",
  },
};
function education(items) {
  return `<ul class="education-list">${items.map((item) => `<li><em class="entry-date">${escape(item.date)}</em>, <strong>${escape(item.institution)}</strong><p class="education-description">${escape(item.description)}</p></li>`).join("")}</ul>`;
}
function publication(item, ui) {
  const figure = item.image ? `<figure class="paper-box-image">
    <button class="paper-image-button" type="button" data-figure aria-haspopup="dialog" aria-label="${escape(item.image.alt)} · ${escape(ui.viewFigure)}">
      <img src="${escape(item.image.src)}" alt="${escape(item.image.alt)}" width="${item.image.width}" height="${item.image.height}" loading="lazy" decoding="async">
    </button>
  </figure>` : "";
  return `<article class="paper-box ${item.image ? "paper-box--illustrated" : "paper-box--text-only"}">
    ${figure}
    <div class="paper-box-text">
      <h4 class="paper-title">${item.url ? link(item.url, escape(item.title)) : escape(item.title)}</h4>
      <p class="paper-venue">${escape(item.venue)}</p>
      ${item.codeUrl ? `<p class="paper-links">${repositoryLink(item.codeUrl)}</p>` : ""}
      ${item.description ? `<p>${escape(item.description)}</p>` : ""}
      ${tags(item.tags)}
      ${details(ui.details, item.detailsHtml)}
    </div>
  </article>`;
}
function publications(items, ui) {
  return Object.keys(publicationStatusOrder).map((status) => {
    const papers = items.filter((item) => item.status === status);
    if (!papers.length) return "";
    const id = `papers-${status}`;
    return `<section class="publication-group" id="${id}" aria-labelledby="${id}-title">
      <h3 class="publication-group-title" id="${id}-title">${escape(ui.publicationGroups[status])}</h3>
      ${papers.map((item) => publication(item, ui)).join("")}
    </section>`;
  }).join("");
}
function projects(items, ui) {
  return items.map((item) => `<article class="project-entry">
    <h3>${link(item.url, `${escape(item.title)} ${icon("arrow")}`)}</h3>
    <p>${escape(item.description)}</p>
    ${tags(item.tags)}
    ${details(ui.projectDetails, `${item.detailsHtml}<p>${repositoryLink(item.url)}</p>`)}
  </article>`).join("");
}
export async function renderPage(resume, lang) {
  const person = resume.locales[lang];
  const ui = translations[lang];
  const navigation = [
    { id: "about-me", title: ui.about }, { id: "education", title: ui.education },
    { id: "honors", title: ui.honors }, { id: "papers", title: ui.publications },
    { id: "projects", title: ui.projects },
  ];
  const content = [
    section("about-me", ui.about, "👨🏻‍💻", `<p>${escape(person.about)}</p>`, true),
    section("education", ui.education, "📖", education(person.education)),
    section("honors", ui.honors, "🏆", `<ul class="honors-list">${person.honors.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>`),
    section("papers", ui.publications, "📝", publications(person.publications, ui)),
    section("projects", ui.projects, "⚙️", projects(person.projects, ui)),
    section("skills", ui.skills, "🛠️", tags(resume.skills)),
    section("languages", ui.languages, "🌐", person.languages.map((item) => `<p>${escape(item)}</p>`).join("")),
  ].join("\n");
  const structuredData = JSON.stringify({
    "@context": "https://schema.org", "@type": "Person", name: person.name,
    alternateName: person.alternateName, url: resume.website, image: resume.website + resume.photo,
    email: resume.email, sameAs: [resume.github], description: person.about,
    alumniOf: { "@type": "CollegeOrUniversity", name: person.education[1].institution },
    knowsAbout: resume.skills,
  }).replace(/</g, "\\u003c");
  return engine.renderFile("default", {
    resume, person, ui, navigation, content, structuredData, year: new Date().getUTCFullYear(),
    displayEmail: resume.email.replace("@", " at "),
    lang, htmlLang: lang === "zh" ? "zh-CN" : "en",
    canonical: resume.website + (lang === "zh" ? "zh.html" : ""),
    title: `${person.name} (${person.alternateName}) - ${ui.home}`,
    icons: Object.fromEntries(Object.keys(paths).map((name) => [name, icon(name)])),
  });
}
