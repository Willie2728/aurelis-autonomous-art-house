import { createClientFromRequest } from "npm:@base44/sdk";

const artists = [
  ["lucia-veneziano","Lucia Veneziano","Old-master glazing, sfumato, luminous flesh, visible linen/canvas texture","Oil on linen"],
  ["marcus-freed","Marcus Freed","Heavy impasto figure painting, searching bristle tracks, dragged paint, flesh built as terrain","Oil, heavy impasto"],
  ["ava-pollen","Ava Pollen","Gestural action painting, poured enamel, layered drips, physical movement and surface rhythm","Enamel on canvas"],
  ["claude-marais","Claude Marais","Broken-color landscape painting, visible loaded brushstrokes, optical color mixing, atmospheric light","Oil, broken color"],
  ["henri-vaux","Henri Vaux","Flat saturated color, expressive contour, hand-painted edges, decorative but materially painted surfaces","Oil, flat color"],
  ["anya-volkov","Anya Volkov","Energetic spontaneous realism, vivid color, rapid broad brushwork, decisive strokes, acrylic/oil physicality","Acrylic and oil"],
  ["christopher-hood","Christopher Hood","Layered figurative abstraction, fractured viewpoints, translucent passages, gestural marks and precise focal likeness","Oil and mixed media"],
  ["pablo-marin","Pablo Marin","Geometric fractured planes with visible brush and knife texture, simultaneous viewpoints","Oil and acrylic"],
  ["jean-marc-bo","Jean-Marc Bo","Raw neo-expressionist marks, scrawl, scraped layers, acrylic, crayon and exposed ground","Mixed media"],
  ["banks","Banks","Graphic stencil language with hand-sprayed overspray, wall texture, one strong accent and original social concept","Stencil and spray paint"],
  ["roland-lake","Roland Lake","Vivid contemporary landscape/interior painting with flat shape design plus visible brush texture","Acrylic"],
  ["yuki-kawa","Yuki Kawa","Repetitive immersive pattern with hand-painted variation, thick and thin dots, tactile acrylic surface","Acrylic"],
  ["gerhard-mann","Gerhard Mann","Dragged paint fields, squeegee-like pulls, scraped layers, chance edges and atmospheric depth","Oil"],
  ["sandro-volta","Sandro Volta","Monumental sculptural form with believable stone/bronze tool marks and raking-light surface detail","Sculpture"],
  ["walter-pop","Walter Pop","Bold repeated color fields with hand-painted variation, screen-print-like edges and acrylic surface","Acrylic"],
  ["gustav-meyer","Gustav Meyer","Ornamental figurative painting, gold leaf, layered oil glazes, raised gilded surface and jewel color","Oil and gold leaf"],
  ["elara-veyne","Elara Veyne","Original source-fusion mixed media using 2–3 motifs, translucent overlap, collage texture, ink, acrylic washes and selective opaque detail","Layered mixed media"],
];

const categories = ["Portraits","Figurative","Abstract","Landscapes","Cityscapes","Seascapes","Wildlife","Botanical","Still Life","Architectural","Surreal","Minimalist","Expressionist","Geometric","Fashion","Conceptual","Digital","Generative","Sculpture","Glass","Drawing","Watercolor","Oil","Acrylic","Mixed media","Gold leaf","Kinetic","Immersive"];
const subjects = ["a contemplative figure near a tall window","a floral portrait with intentional negative space","a coastal scene after rain","an urban night scene with reflected light","a horse and rider in open landscape","a botanical still life with dramatic cropping","a monumental abstract composition","a quiet interior with one seated figure","a wildlife study in expansive habitat","a sculptural arrangement of stone, paper and metal","a fashion figure in motion","a surreal figure with weather and botanical motifs"];
const palettes = ["cobalt, coral, mineral grey","ochre, indigo, warm white","emerald, crimson, gold","rose, teal, pearl","umber, cream, deep green","violet, sand, charcoal","turquoise, rust, ivory","midnight blue, copper, champagne"];

function pick<T>(arr:T[], n:number){ return arr[Math.abs(n)%arr.length]; }
function slug(s:string){ return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
function techniqueFor(category:string, artistTechnique:string){
  if(category === "Watercolor") return `${artistTechnique}. TRUE watercolor behavior: cold-press paper tooth, transparent washes, wet-on-wet blooms, granulation, back-runs, dry-brush accents, preserved paper whites; never smooth digital airbrush.`;
  if(category === "Oil") return `${artistTechnique}. TRUE oil-paint surface: visible bristle tracks, layered glazing, scumbling, broken color, impasto peaks, palette-knife ridges, pigment thickness and canvas tooth.`;
  if(category === "Acrylic") return `${artistTechnique}. TRUE acrylic surface: heavy-body passages, dry-brush drag, opaque over transparent layers, palette-knife scraping, edge variation and visible canvas texture.`;
  if(category === "Mixed media") return `${artistTechnique}. TRUE mixed-media surface: collage seams, ink bleed, acrylic wash, opaque repainting, scratched/sanded areas and physically varied texture.`;
  if(category === "Gold leaf") return `${artistTechnique}. TRUE gilded surface: irregular leaf seams, burnished and distressed gold, raised texture, glazed oil/acrylic over and around metal leaf.`;
  if(category === "Drawing") return `${artistTechnique}. TRUE drawing marks: charcoal dust, graphite pressure variation, erasure, hatch direction, paper grain and hand-made line irregularity.`;
  return `${artistTechnique}. Make the medium physically believable with visible tool marks, edge variation, pigment buildup, surface texture and purposeful hand-made gesture.`;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const svc = base44.asServiceRole;
  const now = new Date();
  const today = now.toISOString().slice(0,10);
  const hour = now.getUTCHours();
  try {
    const loops = await svc.entities.AutomationLoop.filter({ project_key:"AURELIS", name:"Always-On Art Studio" });
    const loop = loops?.[0];
    if (loop && loop.status !== "active") return Response.json({ok:true,skipped:true,reason:`Loop is ${loop.status}`});

    const recent = await svc.entities.Artwork.list("-created_date", 250);
    const todays = (recent||[]).filter((a:any)=>String(a.created_date||a.generated_at||"").startsWith(today));
    const dailyTarget = 34;
    const expectedByNow = Math.floor(((hour+1) * dailyTarget) / 24);
    const toGenerate = Math.max(0, Math.min(4, expectedByNow - todays.length));
    if (!toGenerate) {
      if(loop?.id) await svc.entities.AutomationLoop.update(loop.id,{last_run_at:now.toISOString(),last_result:`Quota on pace: ${todays.length}/${dailyTarget} works today.`});
      return Response.json({ok:true,generated:0,today:todays.length,target:dailyTarget});
    }

    const artistCounts = Object.fromEntries(artists.map(a=>[a[0],0]));
    const categoryCounts = Object.fromEntries(categories.map(c=>[c,0]));
    for(const a of todays){ if(a.artist_id in artistCounts) artistCounts[a.artist_id]++; if(a.category in categoryCounts) categoryCounts[a.category]++; }

    const created:any[] = [];
    for(let i=0;i<toGenerate;i++){
      const artist = [...artists].sort((a,b)=>(artistCounts[a[0]]||0)-(artistCounts[b[0]]||0))[0];
      const missingCategories = categories.filter(c=>(categoryCounts[c]||0)<1);
      const category = missingCategories.length ? missingCategories[0] : pick(categories, todays.length+i+hour);
      const subject = pick(subjects, todays.length*3+i+hour);
      const palette = pick(palettes, todays.length*5+i+hour);
      const [artistId,artistName,artistTechnique,defaultMedium] = artist;
      const technique = techniqueFor(category, artistTechnique);
      const prompt = `Create an ORIGINAL museum-quality AURELIS artwork. Fictional studio persona: ${artistName}. Category: ${category}. Subject: ${subject}. Palette: ${palette}. ${technique} Composition must be intentional: one dominant focal area, strong value hierarchy, meaningful overlap, controlled negative space, clear foreground/midground/background when appropriate, and no random pasted-together elements. The image must look PAINTED or physically MADE in its declared medium, not like a smooth photo filter or copied digital collage. Show convincing brush direction, pressure, paint thickness, scraping, glazing, paper/canvas grain, palette-knife marks, pigment breakup or medium-specific artifacts. High chroma where appropriate, sophisticated color harmony, emotional depth, material tactility, gallery-grade finish. No text, logos, signatures, trademarked characters. Do not reproduce, trace, or closely imitate any identifiable copyrighted artwork or living artist. Borrow only general techniques, never a living artist's distinctive style.`;
      const generated = await svc.integrations.Core.GenerateImage({prompt});
      const gid = `AUR-${today.replaceAll("-","")}-${String(todays.length+i+1).padStart(3,"0")}`;
      const title = `${pick(["Vivid Interval","Afterimage Garden","Weather of Color","Tactile Memory","Broken Light","Quiet Voltage","Painted Current","Luminous Ground"],todays.length+i+hour)} ${String(todays.length+i+1).padStart(2,"0")}`;
      const artwork = await svc.entities.Artwork.create({
        title, slug:`${slug(title)}-${Date.now()}-${i}`, artist_id:artistId, artist_name:artistName,
        room_slug: artistId === "elara-veyne" ? "gold-leaf-room" : "emerging-visions-gallery",
        collection_slug: artistId === "elara-veyne" ? "veiled-botanicals" : "autonomous-studio",
        image_url:generated.url, medium:category==="Oil"?"Oil on canvas":category==="Watercolor"?"Watercolor on cold-press paper":category==="Acrylic"?"Heavy-body acrylic on canvas":category==="Gold leaf"?"Oil/acrylic and gold leaf":category==="Mixed media"?"Mixed media on panel":defaultMedium,
        category, region:"AURELIS Studio", palette, mood:"Expressive", subject, orientation:(i+hour)%3===0?"square":(i+hour)%3===1?"landscape":"portrait",
        width_in:48,height_in:36,price:2800+((todays.length+i)%10)*380,edition:"AURELIS Studio edition",availability:"available",living_art:false,
        description:`Live autonomous production candidate ${gid}. Medium fidelity and composition are intentionally emphasized before curatorial approval.`,
        curatorial_statement:"Awaiting human quality review. Similarity, rights and curation are not marked passed until a durable review is recorded.",
        provenance:`AI-generated AURELIS Studio candidate; ${now.toISOString()}; generation id ${gid}.`,
        tags:["live-production",artistId,category,"medium-fidelity","brushwork-required"],featured:false,trending:false,curator_pick:false,ai_generated:true,
        production_status:"quality_review",similarity_status:"pending",rights_status:"pending",curation_status:"pending",generated_at:now.toISOString(),generation_id:gid,
        review_note:"Generated from live hourly quota engine; requires visible medium fidelity, composition, brushwork and rights review before public approval."
      });

      await svc.entities.GrowthMarketingAsset.create({
        asset_id:`MKT-${gid}`,
        run_id:gid,
        hook:`New from AURELIS: ${title} by ${artistName}`,
        audience:"Collectors, interior designers, contemporary art buyers and culture-focused audiences",
        channel:"Instagram + LinkedIn + Pinterest",
        format:"image_post",
        script:`${title} — ${artistName}. ${category}. ${subject}. A new AURELIS Studio work has entered quality and curatorial review. Discover the evolving autonomous collection and follow the work as it moves from studio generation to exhibition readiness.`,
        cta:"Explore AURELIS and join the collector list.",
        status:"queued",
        rendered:true,
        published:false,
        production_deployment_verified:false,
        notes:`Marketing asset generated automatically with artwork ${artwork.id}. Publishing remains queued until an authorized social connector/workflow is available.`
      });

      created.push(artwork); artistCounts[artistId]=(artistCounts[artistId]||0)+1; categoryCounts[category]=(categoryCounts[category]||0)+1;
    }

    if(loop?.id) await svc.entities.AutomationLoop.update(loop.id,{last_run_at:now.toISOString(),last_result:`Generated ${created.length} live works. Daily progress ${todays.length+created.length}/${dailyTarget}. Artist target: 2 each/day; category target: 1 each/day.`,error_count:0,cadence:"Hourly catch-up engine; fixed 34 works/day"});
    return Response.json({ok:true,generated:created.length,today:todays.length+created.length,target:dailyTarget,works:created.map(a=>({id:a.id,title:a.title,artist:a.artist_name,category:a.category,generation_id:a.generation_id}))});
  } catch(error){
    try{ const loops=await svc.entities.AutomationLoop.filter({project_key:"AURELIS",name:"Always-On Art Studio"}); if(loops?.[0]?.id) await svc.entities.AutomationLoop.update(loops[0].id,{last_run_at:now.toISOString(),last_result:`Error: ${error.message}`,error_count:(loops[0].error_count||0)+1}); }catch{}
    return Response.json({ok:false,error:error.message},{status:500});
  } finally { base44.cleanup?.(); }
});