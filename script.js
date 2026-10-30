const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
const peso=n=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",maximumFractionDigits:0}).format(n);
function setRouteStatus(message,state=""){const e=$("routeStatus");e.textContent=message;e.className=`route-status field full ${state}`;}
function suggestedSalary(km){if(km<=10)return 400;if(km<=20)return 600;if(km<38)return 800;return 1000;}
function updateSalaryHint(){const km=Number($("distance").value)||0;if(!km){$("salaryHint").textContent="Driver salary will be suggested after the route distance is calculated. You can edit it anytime.";return;}const s=suggestedSalary(km);$("salaryHint").textContent=`Suggested driver salary for ${km.toFixed(1)} km: ${peso(s)}. You can edit this for traffic, waiting time, or special arrangements.`;if(!$("driverSalary").dataset.edited)$("driverSalary").value=s;}
function placeText(p){return p.formattedAddress||p.displayName||p.name||"";}

// Enter the one-way driving distance manually.
$("distance").addEventListener("input",()=>{
  $("driverSalary").dataset.edited="";
  updateSalaryHint();
  setRouteStatus("Distance entered manually. Use the one-way driving distance in kilometers.","success");
});
$("destination").addEventListener("input",()=>{
  setRouteStatus("Enter the destination and one-way driving distance, then calculate your fare.");
});
setRouteStatus("Enter the destination and one-way driving distance in kilometers.");
$("driverSalary").addEventListener("input",()=>$("driverSalary").dataset.edited="true");
$("fareForm").addEventListener("submit",calculate);
function calculate(event){
 $("resultPanel").hidden=true;
 if(event)event.preventDefault();
 const km=Number($("distance").value),fuelPrice=Number($("fuelPrice").value),toll=Number($("toll").value)||0,vehicle=$("vehicle").value,rt=$("roundTrip").value==="yes",mult=rt?2:1;
 const efficiency=Number(vehicle==="SUV"?$("suvEfficiency").value:$("vanEfficiency").value),driverBase=Number($("driverSalary").value),rate=Number($("profitRate").value),vehicleRate=Number($("vehicleRate").value),adminRate=Number($("adminRate").value);
 if(!$("fareForm").checkValidity()||!$("destination").value.trim()||!(km>0)||!(fuelPrice>=0)||!(efficiency>0)||!(driverBase>=0)||!(rate>=0)){setRouteStatus("Please enter a destination and a valid one-way distance in kilometers.","error");return;}
 const totalKm=km*mult,fuel=totalKm/efficiency*fuelPrice,driver=driverBase*mult,vehicleCost=totalKm*vehicleRate,admin=totalKm*adminRate;
 const directCosts=fuel+toll+driver;
 const expenses=directCosts+vehicleCost+admin,markup=expenses*rate/100,pre=expenses+markup,selling=Math.ceil(pre/100)*100;
 // Total gain is the amount left after direct trip payments. Vehicle/admin allocations remain within this gain as business reserves.
 const totalGain=selling-directCosts,rounding=selling-pre;
 $("totalPrice").textContent=peso(selling);
 $("resultDestination").textContent=$("destination").value.trim()||"Destination";
 $("resultTrip").textContent=`${rt?"Round trip":"One-way"} · ${vehicle} · ${km.toFixed(1)} km one-way`;
 $("receiptGuest").textContent=$("guestName").value.trim()||"Walk-in guest";
 $("receiptDriver").textContent=$("driverName").value.trim()||"Not specified";
 $("receiptDate").textContent=new Intl.DateTimeFormat("en-PH",{dateStyle:"medium",timeStyle:"short"}).format(new Date());
 $("breakdown").innerHTML=`
  <div class="receipt-section-label">TRIP DETAILS</div>
  <div><span>Pickup</span><strong>Score Birds Hotel, Angeles City</strong></div>
  <div><span>Destination</span><strong>${escapeHtml($("destination").value.trim()||"Destination")}</strong></div>
  <div><span>Guest / customer</span><strong>${escapeHtml($("guestName").value.trim()||"Walk-in guest")}</strong></div>
  <div><span>Driver</span><strong>${escapeHtml($("driverName").value.trim()||"Not specified")}</strong></div>
  <div><span>Distance</span><strong>${totalKm.toFixed(1)} km total</strong></div>
  <div class="receipt-section-label">DIRECT TRIP EXPENSES</div>
  <div><span>Fuel (${totalKm.toFixed(1)} km ÷ ${efficiency} km/L)</span><strong>${money(fuel)}</strong></div>
  <div><span>Toll allowance (whole trip)</span><strong>${money(toll)}</strong></div>
  <div><span>Driver salary${rt?" (× 2)":""}</span><strong>${money(driver)}</strong></div>
  <div class="subtotal"><span>Total direct expenses</span><strong>${money(directCosts)}</strong></div>
  <div class="receipt-section-label">PROFIT BREAKDOWN</div>
  <div><span>Vehicle maintenance reserve (${vehicleRate.toFixed(2)}/km)</span><strong>${money(vehicleCost)}</strong></div>
  <div><span>Administrative reserve (${adminRate.toFixed(2)}/km)</span><strong>${money(admin)}</strong></div>
  <div><span>Additional profit markup (${rate.toFixed(1)}%)</span><strong>${money(markup)}</strong></div>
  <div><span>Rounding adjustment</span><strong>${money(rounding)}</strong></div>
  <div class="profit-total"><span>TOTAL GAIN / PROFIT</span><strong>${money(totalGain)}</strong></div>
  <div class="receipt-total"><span>AMOUNT TO COLLECT</span><strong>${peso(selling)}</strong></div>`;
 $("resultPanel").hidden=false;
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("printReceipt").addEventListener("click",()=>window.print());
$("menuToggle").addEventListener("click",()=>{const n=$("mainNav"),o=n.classList.toggle("open");$("menuToggle").setAttribute("aria-expanded",String(o));});
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));
$("year").textContent=new Date().getFullYear();updateSalaryHint();

["input","change"].forEach(type=>$("fareForm").addEventListener(type,()=>{$("resultPanel").hidden=true;}));
