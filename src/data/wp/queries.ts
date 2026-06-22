/**
 * GraphQL documents. Field names equal the ACF field names; ACF select
 * fields come back as [String] (mapper takes [0]); image/file fields are
 * connection edges resolved via { node { mediaItemUrl } }.
 */

const MEDIA = `{ node { mediaItemUrl } }`;
const CTA = `cta { label href variant arrow }`;

/** All page-builder layouts that can appear on a stored page. */
const BLOCKS = `
  blocks {
    __typename
    ... on PageBuilderBlocksHeroLayout {
      variant titleSegments { kind text }
      bgImage ${MEDIA} bgVideoMp4 ${MEDIA} bgVideoWebm ${MEDIA} overlayImage ${MEDIA} overlayStrength
    }
    ... on PageBuilderBlocksIntroStatsLayout { intro ${CTA} stats { prefix value suffix label } }
    ... on PageBuilderBlocksPartnersForGrowthLayout { title body ${CTA} bgImage ${MEDIA} }
    ... on PageBuilderBlocksPortfolioMarqueeLayout { title ${CTA} investmentSlugs(first: 100) { nodes { ... on Investment { slug } } } }
    ... on PageBuilderBlocksNewsLayout { title ${CTA} articleSlugs(first: 100) { nodes { ... on Article { slug } } } }
    ... on PageBuilderBlocksCenteredIntroLayout { title paragraphs { text } tone layout }
    ... on PageBuilderBlocksSectorFocusLayout { title subtitle paragraphs { text } }
    ... on PageBuilderBlocksApproachCardsLayout { title body cards { title image ${MEDIA} } }
    ... on PageBuilderBlocksQuoteLayout { quotes { quote author authorTitle authorPhoto ${MEDIA} } intervalSeconds }
    ... on PageBuilderBlocksInvestmentCriteriaLayout { title rows { icon label contentType text pairs { key value } items { text } } }
    ... on PageBuilderBlocksPageHeaderLayout { title subtitle tone }
    ... on PageBuilderBlocksTeamGridLayout { memberSlugs(first: 100) { nodes { ... on TeamMember { slug } } } }
    ... on PageBuilderBlocksNewsListLayout { perPage }
    ... on PageBuilderBlocksContactLayout { title recipient info { label value href } }
    ... on PageBuilderBlocksLegalPageLayout {
      title effectiveDate
      legalIntro: intro { text }
      sections { heading content { kind html items { text } } }
    }
    ... on PageBuilderBlocksInvestmentsListLayout { __typename }
  }`;

export const PAGE_QUERY = `
  query Page($slug: String!) {
    pages(first: 1, where: { name: $slug }) {
      nodes { title excerpt pageBuilder { ${BLOCKS} } }
    }
  }`;

export const INVESTMENTS_QUERY = `
  query Investments {
    investments(first: 200, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        slug title
        parent { node { ... on Investment { slug } } }
        sectors { nodes { name } }
        investmentFields {
          logo ${MEDIA} logoDark ${MEDIA} status tagline website platformInvestmentDate
          description { text }
          acquisitions { name logo ${MEDIA} }
          relatedNews(first: 100) { nodes { ... on Article { slug } } }
          externalNews { title url }
          featuredImage ${MEDIA} hidden
        }
      }
    }
  }`;

export const ARTICLES_QUERY = `
  query Articles {
    articles(first: 200) {
      nodes {
        slug title date
        articleFields {
          shortTitle homeCardLines { text } excerpt
          body { heading paragraphs { text } }
          readMinutes category coverImage ${MEDIA} source externalUrl
        }
      }
    }
  }`;

export const TEAM_QUERY = `
  query Team {
    teamMembers(first: 200) {
      nodes {
        slug title menuOrder
        teamFields { fullName title modalTitle bio { text } photo ${MEDIA} linkedin email }
      }
    }
  }`;

export const SETTINGS_QUERY = `
  query Settings {
    siteSettings {
      siteSettingsFields {
        siteName tagline
        contact { address address2 phone email }
        social { platform href }
        nav { label href }
      }
    }
  }`;
