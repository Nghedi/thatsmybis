var table=null,colName=0,colLoot=1,colWishlist=2,colPrios=3,colRecipes=4,colRoles=5,colNotes=6,colClass=7,colRaidGroup=8,allItemsVisible=!1;function createTable(){return memberTable=$("#characterTable").DataTable({autoWidth:!1,data:characters,columns:[{title:'<span class="fas fa-fw fa-user"></span> Character',data:"character",render:function render(e,t,a){return'\n                    <ul class="no-bullet no-indent mb-2">\n                        <li>\n                            <div class="dropdown text-'.concat(a.class?a.class.toLowerCase():"",'">\n                                <a class="dropdown-toggle text-4 font-weight-bold text-').concat(a.class?a.class.toLowerCase():"",'"\n                                    id="character').concat(a.id,'Dropdown"\n                                    role="button"\n                                    data-toggle="dropdown"\n                                    aria-haspopup="true"\n                                    aria-expanded="false"\n                                    title="').concat(a.username?a.username:"",'">\n                                    ').concat(a.name,'\n                                </a>\n                                <div class="dropdown-menu" aria-labelledby="character').concat(a.id,'Dropdown">\n                                    <a class="dropdown-item" href="/').concat(guild.id,"/").concat(guild.slug,"/c/").concat(a.id,"/").concat(a.slug,'" target="_blank">\n                                        Profile\n                                    </a>\n                                    <a class="dropdown-item" href="/').concat(guild.id,"/").concat(guild.slug,"/audit-log?character_id=").concat(a.id,'" target="_blank">\n                                        Logs\n                                    </a>\n                                    ').concat(showEdit?'<a class="dropdown-item" href="/'.concat(guild.id,"/").concat(guild.slug,"/c/").concat(a.id,"/").concat(a.slug,'/edit" target="_blank">\n                                            Edit\n                                        </a>\n                                        <a class="dropdown-item" href="/').concat(guild.id,"/").concat(guild.slug,"/c/").concat(a.id,"/").concat(a.slug,'/loot" target="_blank">\n                                            Loot\n                                        </a>'):"","\n                                </div>\n                            </div>\n                        </li>\n                        ").concat(a.is_alt||a.raid_group_name||a.class?"\n                            <li>\n                                ".concat(a.is_alt?'\n                                    <span class="text-legendary font-weight-bold">Alt</span>&nbsp;\n                                ':"","\n                                ").concat(a.raid_group_name?'\n                                    <span class="font-weight-bold">\n                                        <span class="role-circle" style="background-color:'.concat(a.raid_group_color?getColorFromDec(parseInt(a.raid_group_color)):"",'"></span>\n                                        ').concat(a.raid_group_name?a.raid_group_name:"","\n                                    </span>\n                                "):"","\n                                ").concat(a.class?a.class:"","\n                            </li>"):"","\n\n                        ").concat(a.level||a.race||a.spec?"\n                            <li>\n                                <small>\n                                    ".concat(a.level?a.level:"","\n                                    ").concat(a.race?a.race:"","\n                                    ").concat(a.spec?a.spec:"","\n                                </small>\n                            </li>"):"","\n\n                        ").concat(a.rank||a.profession_1||a.profession_2?"\n                            <li>\n                                <small>\n                                    ".concat(a.rank?"Rank "+a.rank+(a.profession_1||a.profession_2?",":""):"","\n                                    ").concat(a.profession_1?a.profession_1+(a.profession_2?",":""):"","\n                                    ").concat(a.profession_2?a.profession_2:"","\n                                </small>\n                            </li>"):"","\n                        ").concat(showEdit?"\n                            ".concat(a.is_received_unlocked?'<li class="list-inline-item small text-warning" title="To lock, edit the member that owns this character">loot unlocked</li>':"","\n                            ").concat(a.is_wishlist_unlocked?'<li class="list-inline-item small text-warning" title="To lock, edit the member that owns this character">wishlist unlocked</li>':"","\n                            "):"","\n                    </ul>")},visible:!0,width:"250px"},{title:'<span class="text-success fas fa-fw fa-sack"></span> Loot Received',data:"received",render:function render(e,t,a){return e&&e.length?getItemList(e,"received",a.id):"—"},orderable:!1,visible:!0,width:"280px"},{title:'<span class="text-legendary fas fa-fw fa-scroll-old"></span> Wishlist\n                    <span class="js-sort-wishlists text-link">\n                        <span class="fas fa-fw fa-exchange cursor-pointer"></span>\n                    </span>',data:"wishlist",render:function render(e,t,a){if(e&&e.length){var n,i="";return i+=getItemList(e.slice().sort(function(e,t){return t.instance_order-e.instance_order||e.pivot.order-t.pivot.order}),"wishlist",a.id,!0,!0,"js-wishlist-sorted",!!guild.do_sort_items_by_instance),i+=getItemList(e,"wishlist",a.id,!0,!1,"js-wishlist-unsorted",!guild.do_sort_items_by_instance)}return"—"},orderable:!1,visible:!!showWishlist,width:"280px"},{title:'<span class="text-gold fas fa-fw fa-sort-amount-down"></span> Prio\'s',data:"prios",render:function render(e,t,a){return e&&e.length?getItemList(e,"prio",a.id,!0):"—"},orderable:!1,visible:!!showPrios,width:"280px"},{title:'<span class="text-gold fas fa-fw fa-book"></span> Recipes',data:"recipes",render:function render(e,t,a){return e&&e.length?getItemList(e,"recipes",a.id):"—"},orderable:!1,visible:!1,width:"280px"},{title:"Roles",data:"user.roles",render:function render(e,t,a){var n="";return e&&e.length>0?(n='<ul class="list-inline">',e.forEach(function(e,t){var a=0!=e.color?"#"+rgbToHex(e.color):"#FFFFFF";n+='<li class="list-inline-item"><span class="tag" style="border-color:'.concat(a,';"><span class="role-circle" style="background-color:').concat(a,'"></span>').concat(e.name,"</span></li>")}),n+="</ul>"):n="—",n},orderable:!1,visible:!1},{title:'<span class="fas fa-fw fa-comment-alt-lines"></span> Notes',data:"public_note",render:function render(e,t,a){return(a.public_note?'<span class="js-markdown-inline">'.concat(nl2br(a.public_note),"</span>"):"—")+(a.officer_note?'<br><small class="font-weight-bold font-italic text-gold">Officer\'s Note</small><br><span class="js-markdown-inline">'.concat(nl2br(a.officer_note),"</span>"):"")},orderable:!1,visible:!0,width:"280px"},{title:"Class",data:"class",render:function render(e,t,a){return a.class?a.class:null},visible:!1},{title:"Raid Group",data:"raid_group",render:function render(e,t,a){return a.raid_group_name?a.raid_group_name:null},visible:!1}],order:[],paging:!1,fixedHeader:!0,initComplete:function initComplete(){var e=[colClass,colRaidGroup];this.api().columns().every(function(t){var a=this,n=null,i=null;t==colClass&&(n=$("#class_filter"),i=null),t==colRaidGroup&&(n=$("#raid_group_filter"),i=null),e.includes(t)&&(n.on("change",function(){var e=$.fn.dataTable.util.escapeRegex($(this).val());i&&i.val()&&(e="(?=.*"+e+")(?=.*"+$.fn.dataTable.util.escapeRegex(i.val())+")"),a.search(e||"",!0,!1).draw()}).change(),i&&i.on("change",function(){var e=$.fn.dataTable.util.escapeRegex($(this).val());n&&n.val()&&(e="(?=.*"+e+")(?=.*"+$.fn.dataTable.util.escapeRegex(n.val())+")"),a.search(e||"",!0,!1).draw()}).change())}),makeWowheadLinks(),addItemAutocompleteHandler(),addTagInputHandlers(),addWishlistSortHandlers(),parseMarkdown()}}),memberTable}function addClippedItemHandlers(){$(".js-show-clipped-items").click(function(){var e=$(this).data("id"),t=$(this).data("type");$(".js-clipped-item[data-id='"+e+"'][data-type='"+t+"']").show(),$(".js-show-clipped-items[data-id='"+e+"'][data-type='"+t+"']").hide(),$(".js-hide-clipped-items[data-id='"+e+"'][data-type='"+t+"']").show()}),$(".js-hide-clipped-items").click(function(){var e=$(this).data("id"),t=$(this).data("type");$(".js-clipped-item[data-id='"+e+"'][data-type='"+t+"']").hide(),$(".js-show-clipped-items[data-id='"+e+"'][data-type='"+t+"']").show(),$(".js-hide-clipped-items[data-id='"+e+"'][data-type='"+t+"']").hide()})}function addInstanceFilterHandlers(){$("#instance_filter").change(function(){var e=$("#instance_filter").val();e?(allItemsVisible=!1,$(".js-show-all-clipped-items").click(),$(".js-show-all-clipped-items").hide(),$(".js-show-clipped-items").hide(),$(".js-hide-clipped-items").hide(),$("li.js-has-instance[data-instance-id='"+e+"']").show(),$("li.js-has-instance[data-instance-id!='"+e+"']").hide()):($("li.js-has-instance[data-instance-id]").show(),allItemsVisible=!0,$(".js-show-all-clipped-items").click(),$(".js-show-all-clipped-items").show(),$(".js-show-clipped-items").show(),$(".js-hide-clipped-items").hide())})}function getItemList(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,l=!(arguments.length>6&&void 0!==arguments[6])||arguments[6],c='<ol class="no-indent js-item-list mb-2 '.concat(s,'" data-type="').concat(t,'" data-id="').concat(a,'" style="').concat(l?"":"display:none;",'">'),o=4,d=null,r=null;return $.each(e,function(s,l){var o=!1;s>=4&&(o=!0,4==s&&(c+='<li class="js-show-clipped-items small cursor-pointer no-bullet " data-type="'.concat(t,'" data-id="').concat(a,'">show ').concat(e.length-4," more…</li>"))),"prio"==t&&l.pivot.raid_group_id&&l.pivot.raid_group_id!=r&&(r=l.pivot.raid_group_id,c+='\n                <li data-raid-group-id="" class="'.concat(o?"js-clipped-item":"",' js-item-wishlist-character no-bullet font-weight-normal font-italic text-muted small"\n                    style="').concat(o?"display:none;":"",'"\n                    data-type="').concat(t,'"\n                    data-id="').concat(a,'">\n                    ').concat(raidGroups.length>0?raidGroups.find(function(e){return e.id===l.pivot.raid_group_id}).name:"","\n                </li>\n            ")),i&&l.instance_id&&l.instance_id!=d&&(d=l.instance_id,c+='\n                <li class="js-has-instance '.concat(o?"js-clipped-item":"",' no-bullet font-weight-normal font-italic text-muted small"\n                    style="').concat(o?"display:none;":"",'"\n                    data-type="').concat(t,'"\n                    data-id="').concat(a,'"\n                    data-instance-id="').concat(l.instance_id,'">\n                    ').concat(l.instance_name,"\n                </li>\n            "));var p='data-wowhead-link="https://'.concat(wowheadSubdomain,".wowhead.com/item=").concat(l.item_id,'"\n            data-wowhead="item=').concat(l.item_id,"?domain=").concat(wowheadSubdomain,'"');c+='\n            <li class="js-has-instance font-weight-normal '.concat(o?"js-clipped-item":"",'"\n                data-type="').concat(t,'"\n                data-id="').concat(a,'"\n                data-instance-id="').concat(l.instance_id,'"\n                value="').concat(n?l.pivot.order:"",'"\n                style="').concat(o?"display:none;":"",'">\n                ').concat(guild.tier_mode?'<span class="text-monospace font-weight-medium text-tier-'.concat(l.guild_tier?l.guild_tier:"",'">').concat(l.guild_tier?getItemTierLabel(l,guild.tier_mode):"&nbsp;","</span>"):"",'\n                <a href="/').concat(guild.id,"/").concat(guild.slug,"/i/").concat(l.item_id,"/").concat(slug(l.name),'"\n                    class="').concat(l.quality?"q"+l.quality:""," ").concat(!l.pivot.is_received||"wishlist"!=l.pivot.type&&"prio"!=l.pivot.type?"":"font-strikethrough",'"\n                    ').concat(p,">\n                    ").concat(l.name,"\n                </a>\n                ").concat(l.pivot.is_offspec?'<span title="offspec item" class="small font-weight-bold text-muted">OS</span>':"",'\n                <span class="js-watchable-timestamp js-timestamp-title smaller text-muted"\n                    data-timestamp="').concat(l.pivot.received_at?l.pivot.received_at:l.pivot.created_at,'"\n                    data-title="added by ').concat(l.added_by_username,' at"\n                    data-is-short="1">\n                </span>\n            </li>')}),e.length>4&&(c+='<li class="js-hide-clipped-items small cursor-pointer no-bullet" style="display:none;" data-type="'.concat(t,'" data-id="').concat(a,'">show less</li>')),c+="</ol>"}$(document).ready(function(){table=createTable(),$(".toggle-column").click(function(e){e.preventDefault();var t=table.column($(this).attr("data-column"));t.visible(!t.visible())}),$(".toggle-column-default").click(function(e){e.preventDefault(),table.column(colName).visible(!0),table.column(colRoles).visible(!1),table.column(colLoot).visible(!0),table.column(colWishlist).visible(!0),table.column(colRecipes).visible(!1),table.column(colNotes).visible(!0)}),table.on("column-visibility.dt",function(e,t,a,n){makeWowheadLinks(),addClippedItemHandlers(),trackTimestamps(),parseMarkdown()}),$(".js-show-all-clipped-items").click(function(){allItemsVisible?($(".js-clipped-item").hide(),$(".js-show-clipped-items").show(),$(".js-hide-clipped-items").hide(),allItemsVisible=!1):($(".js-clipped-item").show(),$(".js-show-clipped-items").hide(),$(".js-hide-clipped-items").hide(),allItemsVisible=!0)}),addClippedItemHandlers(),addInstanceFilterHandlers(),trackTimestamps()});
