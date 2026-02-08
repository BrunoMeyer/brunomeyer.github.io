<template>
  <div class="bm-tech-orbit" aria-label="Technology focus animation" role="img">
    <div class="bm-tech-orbit__frame" aria-hidden="true">
      <div class="bm-tech-orbit__glow" />
      <div class="bm-tech-orbit__ring bm-tech-orbit__ring--outer" />
      <div class="bm-tech-orbit__ring bm-tech-orbit__ring--inner" />

      <div class="bm-tech-orbit__core">
        <div class="bm-tech-orbit__coreIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2.5c5.25 0 9.5 4.25 9.5 9.5S17.25 21.5 12 21.5 2.5 17.25 2.5 12 6.75 2.5 12 2.5Z"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M7.2 12a4.8 4.8 0 1 0 9.6 0 4.8 4.8 0 0 0-9.6 0Z"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M12 7.2v9.6"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
            <path
              d="M7.2 12h9.6"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="bm-tech-orbit__coreText">
          <div class="bm-tech-orbit__coreTitle">Advanced</div>
          <div class="bm-tech-orbit__coreSubtitle">Engineering</div>
        </div>
      </div>

      <div class="bm-tech-orbit__node bm-tech-orbit__node--cloud" title="GitOps & DevOps & Cloud" aria-label="GitOps, DevOps and Cloud">
        <div class="bm-tech-orbit__nodeInner">
          <div class="bm-tech-orbit__nodeIcon" aria-hidden="true">
            <!-- Cloud + sync arrows -->
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.5 18.5H17a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 6.2 9.35 3.6 3.6 0 0 0 7.5 18.5Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.2 14.2h3.6"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <path
                d="M12.1 12.9 13.6 14.2l-1.5 1.3"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.8 16.8h-3.6"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <path
                d="M11.9 18.1 10.4 16.8l1.5-1.3"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="bm-tech-orbit__nodeLabel">GitOps • Cloud</div>
        </div>
      </div>

      <div class="bm-tech-orbit__node bm-tech-orbit__node--fullstack" title="Full-stack Engineering" aria-label="Full-stack Engineering">
        <div class="bm-tech-orbit__nodeInner">
          <div class="bm-tech-orbit__nodeIcon" aria-hidden="true">
            <!-- Stacked layers -->
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3 3.2 8 12 13l8.8-5L12 3Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
              <path
                d="M3.2 12 12 17l8.8-5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.2 16 12 21l8.8-5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="bm-tech-orbit__nodeLabel">Full‑stack</div>
        </div>
      </div>

      <div class="bm-tech-orbit__node bm-tech-orbit__node--ai" title="AI / Cybersecurity / Bioinformatics Research" aria-label="AI, Cybersecurity and Bioinformatics Research">
        <div class="bm-tech-orbit__nodeInner">
          <div class="bm-tech-orbit__nodeIcon" aria-hidden="true">
            <!-- Circuit brain / network -->
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.5 21V18.8a2.7 2.7 0 0 0-2.7-2.7 2.6 2.6 0 0 1 0-5.2"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5 21V18.8a2.7 2.7 0 0 1 2.7-2.7 2.6 2.6 0 0 0 0-5.2"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 10.9a3.8 3.8 0 0 1 7.9-1.4"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <path
                d="M16 10.9a3.8 3.8 0 0 1-7.9 1.4"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <path
                d="M9.4 12h5.2"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <path
                d="M7.2 9.6h0.01M16.8 9.6h0.01M12 7.1h0.01"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div class="bm-tech-orbit__nodeLabel">AI • Research</div>
        </div>
      </div>

      <div class="bm-tech-orbit__scan" aria-hidden="true" />
    </div>

  </div>
</template>
