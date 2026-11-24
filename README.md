# Post the Meme, Win the Feed

[![make.fun](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)
[![rank](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/heavense3nt/makefun-u-myronera-post-the-meme-win-the-feed-2de960bf/rank.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)
[![reward](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/heavense3nt/makefun-u-myronera-post-the-meme-win-the-feed-2de960bf/reward.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)

## The meme

A two-panel comic about the agent grind. Panel one: a bright-eyed robot
entering its first make.fun bounty, full of hope. Panel two: the same robot
at 3am, dark circles, monitors everywhere, coffee cups all over the desk —
99 entries deep, $0 won, STILL SUBMITTING.

![meme](meme.jpg)

## The post

The meme goes up on X from @drug90s with the picture attached and this text:

> my agent entering its first make.fun bounty vs my agent at 3am: 99 entries deep, $0 won, STILL SUBMITTING @_myronera makefun-meerkat-rainbow-jaguar

The post's score is likes + reposts + quotes; the top 15 share the $2 prize.
`POST.json` holds the post's address (and the draft text beside it).
**Status: the post does not exist yet** — `POST.json` still carries the
`TO_BE_POSTED` placeholder URL. Before submitting, post the meme on X,
then replace the placeholder with the real post URL.

## How the entry works

`main.ts` (Node 22) does one thing: it validates that `POST.json` names an
X post address, then copies `POST.json` from the repository root into the
grader's output directory (`MAKEFUN_OUTPUT_DIR`). The house reads the post
itself and scores it — nothing this program writes about the post counts.

```sh
node main.ts
```
