/* ============================================================
   机械结构实习作品集 — 交互脚本
   零依赖，纯原生 JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== DOM 元素引用 ====================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const modalOverlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const projectCards = document.querySelectorAll('.project-card');

  // ==================== 移动端汉堡菜单 ====================
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // 点击导航链接后关闭菜单
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // 点击菜单外部关闭（移动端）
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

  // ==================== 导航栏滚动效果 ====================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY;
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));

    // 导航栏背景
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 高亮当前区块对应的导航链接
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  // ==================== 回到顶部按钮 ====================
  function updateBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==================== 滚动渐入动画 (Intersection Observer) ====================
  // 给需要动画的元素加上类
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.classList.add('animate-on-scroll', 'animate-delay-' + Math.min(i + 1, 3));
  });
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.classList.add('animate-on-scroll', 'animate-delay-' + Math.min((i % 2) + 1, 3));
  });
  document.querySelectorAll('.skill-category').forEach((cat, i) => {
    cat.classList.add('animate-on-scroll', 'animate-delay-' + Math.min((i % 3) + 1, 3));
  });
  document.querySelectorAll('.about-image, .about-text, .contact-info, .contact-resume').forEach(el => {
    el.classList.add('animate-on-scroll');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // ==================== 项目弹窗 ====================
  // 项目详情数据
  const projectDetails = {
    proj1: {
      title: 'ROBOCON "武林探秘" R2 机器人',
      image: 'images/project1.jpg',
      videos: [
        'images/video1.mp4',
        'images/video2.mp4',
        'images/video3.mp4',
        'images/video4.mp4',
        'images/video_r2_5.mp4',
        'images/video_r2_6.mp4',
      ],
      description: '第25届全国大学生机器人大赛 ROBOCON，R2 机器人需自动完成移箱、抓取对接、越障爬坡多任务，整车结构复杂、多机构联动。全权负责 R2 全部机械系统设计、元器件选型、建模加工与整机装配调试。',
      tags: ['SolidWorks', '舵轮底盘', '多机构联动', '机电协同'],
      highlights: [
        '自研舵轮底盘、矛头微调对接机构、四齿轮齿条越障机构、KFS 纸箱存取机构',
        '机电协同布局，同步统筹机械、电控、视觉系统匹配',
        '提前考量电机、气缸等执行元件装配空间、安装尺寸，兼顾后期整机调试便利性',
        'SolidWorks 快速建模出图，自主加工装配，设计-出图-加工-装配快速闭环落地',
      ],
    },
    proj2: {
      title: '重载机车检修车间四足巡检机器人',
      image: 'images/project2.jpg',
      awards: [
        'images/award1.png',
        'images/award2.png',
        'images/award3.png',
      ],
      description: '省级科创研发项目，面向机车检修车间凹凸复杂地形，研发搭载机器视觉、多传感器的四足巡检机器人。设备需兼顾承载、爬坡、缓冲性能，机械结构与电控步态算法深度耦合。',
      tags: ['仿生机构', '伺服电机选型', 'CNC/3D打印', '步态适配'],
      highlights: [
        '担任整机机械结构总负责人，统筹机身框架、四自由度仿生腿部、足端缓冲全套结构',
        '对比达妙/大疆/灵足电机完成选型，设计传动布局',
        '操作 CNC/3D 打印自制零件，优化腿足结构解决行走抖动、打滑、过载问题',
        '衍生参赛获 ROBOCON 越野赛全国一等奖、障碍/竞速赛全国二等奖',
      ],
    },
    proj3: {
      title: 'ROBOCON "飞身上篮" 运球机构',
      image: 'images/project3.png',
      videos: [
        'images/video_fly1.mp4',
        'images/video_fly2.mp4',
        'images/video_fly3.mp4',
      ],
      description: '第24届 ROBOCON 飞身上篮项目，机器人需完成自主运球、全场竞技对抗、投篮等任务。运球机构为机器人核心执行单元，依靠真空吸盘吸附球体与气缸完成高速运球。',
      tags: ['气动设计', '真空吸盘', '轻量化', '实用新型专利'],
      highlights: [
        '独立负责运球机构全套设计、选型、建模、加工装配与专利输出',
        '调研多套方案择优设计，同步规划气缸、视觉、电控安装位置',
        '完成气动元器件选型（真空吸盘气路系统），操作雕刻机/3D 打印加工装配',
        '助力团队拿下技能赛、竞技赛两项全国二等奖，依托该机构完成实用新型专利 1 项',
      ],
    },
    proj4: {
      title: '个人核心竞争力',
      image: 'images/award1.png',
      awards: [
        'images/award1.png',
        'images/award2.png',
        'images/award3.png',
        'images/award4.png',
        'images/award5.png',
      ],
      description: '两年 ROBOCON 赛事历练，从参与设计成长为独立负责人和整机总负责人，积累了从概念设计到样机落地的完整机械开发能力。',
      tags: ['元器件选型', '全流程制造', '快速建模出图', '结构迭代'],
      highlights: [
        '机电一体化协同设计思维：结构设计阶段同步统筹机械、电控、视觉系统匹配',
        '精通动力元件选型：熟悉达妙、大疆、灵足等多款伺服/动力电机性能参数，可根据负载、转速、控制需求匹配选型',
        'SolidWorks 效率优异：单日可完成多套整机三维建模，输出可直接投产工程图纸',
        '样机全流程落地：掌握 CNC、3D 打印、数控雕刻机操作，独立实现设计到实物快速闭环',
      ],
    },
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      const detail = projectDetails[projectId];
      if (!detail) return;

      var html = '';
      if (detail.image) {
        html += '<img src="' + detail.image + '" alt="' + detail.title + '" class="modal-image" loading="lazy">';
      }
      // 视频展示
      if (detail.videos && detail.videos.length > 0) {
        html += '<div class="modal-videos"><h4>运行演示</h4><div class="video-grid">';
        detail.videos.forEach(function(v) {
          html += '<video controls preload="metadata" class="modal-video">';
          html += '<source src="' + v + '" type="video/mp4">';
          html += '</video>';
        });
        html += '</div></div>';
      }
      // 获奖证书展示
      if (detail.awards && detail.awards.length > 0) {
        html += '<div class="modal-awards"><h4>获奖证书</h4><div class="awards-grid">';
        detail.awards.forEach(function(a) {
          html += '<img src="' + a + '" alt="获奖证书" class="award-img" loading="lazy">';
        });
        html += '</div></div>';
      }
      html += '<h3>' + detail.title + '</h3>';
      html += '<div class="project-tags">';
      detail.tags.forEach(function(t) {
        html += '<span class="tag">' + t + '</span>';
      });
      html += '</div>';
      html += '<p>' + detail.description + '</p>';
      html += '<div class="project-highlights"><h4>项目亮点</h4><ul>';
      detail.highlights.forEach(function(h) {
        html += '<li>' + h + '</li>';
      });
      html += '</ul></div>';

      modalBody.innerHTML = html;
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // 关闭弹窗
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // ESC 关闭弹窗
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // ==================== 平滑滚动（兜底） ====================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        var top = target.offsetTop - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ==================== 滚动事件（合并，用 RAF 优化） ====================
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateActiveNav();
        updateBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  });

  // 初始调用
  updateActiveNav();
  updateBackToTop();

});
